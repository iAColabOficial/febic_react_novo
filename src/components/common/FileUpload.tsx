import { useCallback, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  FileText, 
  X, 
  CheckCircle, 
  AlertCircle,
  Download,
  Eye
} from 'lucide-react';

interface FileUploadProps {
  projectId: number;
  allowedTypes?: string[];
  maxFileSize?: number; // MB
  onUploadComplete?: (files: UploadedFile[]) => void;
}

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'completed' | 'error';
  progress: number;
  url?: string;
}

export function FileUpload({ 
  projectId, 
  allowedTypes = ['pdf', 'doc', 'docx', 'mp4', 'jpg', 'png'],
  maxFileSize = 50,
  onUploadComplete 
}: FileUploadProps) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const validateFile = (file: File): string | null => {
    const extension = file.name.split('.').pop()?.toLowerCase();
    if (!extension || !allowedTypes.includes(extension)) {
      return `Tipo de arquivo não permitido. Permitidos: ${allowedTypes.join(', ')}`;
    }
    
    if (file.size > maxFileSize * 1024 * 1024) {
      return `Arquivo muito grande. Máximo: ${maxFileSize}MB`;
    }
    
    return null;
  };

  const uploadFile = async (file: File): Promise<UploadedFile> => {
    const fileId = Math.random().toString(36).substr(2, 9);
    
    const uploadedFile: UploadedFile = {
      id: fileId,
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'uploading',
      progress: 0
    };

    setFiles(prev => [...prev, uploadedFile]);

    // Simulate upload progress
    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setFiles(prev => prev.map(f => 
        f.id === fileId ? { ...f, progress } : f
      ));
    }

    // Simulate upload completion
    const completedFile = {
      ...uploadedFile,
      status: 'completed' as const,
      progress: 100,
      url: `https://api.febic.com/files/${fileId}`
    };

    setFiles(prev => prev.map(f => 
      f.id === fileId ? completedFile : f
    ));

    return completedFile;
  };

  const handleFiles = useCallback(async (fileList: FileList) => {
    const filesArray = Array.from(fileList);
    
    for (const file of filesArray) {
      const error = validateFile(file);
      if (error) {
        // Show error - in real app, use toast notification
        alert(error);
        continue;
      }
      
      try {
        await uploadFile(file);
      } catch (err) {
        setFiles(prev => prev.map(f => 
          f.name === file.name ? { ...f, status: 'error' } : f
        ));
      }
    }
  }, [allowedTypes, maxFileSize]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  }, [handleFiles]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  }, []);

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Upload de Documentos
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Upload Zone */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive 
              ? 'border-primary bg-primary/5' 
              : 'border-muted-foreground/25 hover:border-primary/50'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">
            Arraste arquivos aqui ou clique para selecionar
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Tipos permitidos: {allowedTypes.join(', ')} • Máximo: {maxFileSize}MB
          </p>
          <input
            type="file"
            multiple
            accept={allowedTypes.map(type => `.${type}`).join(',')}
            onChange={(e) => e.target.files && handleFiles(e.target.files)}
            className="hidden"
            id="file-upload"
          />
          <Button asChild>
            <label htmlFor="file-upload" className="cursor-pointer">
              Selecionar Arquivos
            </label>
          </Button>
        </div>

        {/* Files List */}
        {files.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium">Arquivos:</h4>
            {files.map((file) => (
              <div key={file.id} className="flex items-center gap-3 p-3 border rounded-lg">
                <FileText className="h-5 w-5 text-muted-foreground" />
                
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{file.name}</span>
                    <div className="flex items-center gap-2">
                      {file.status === 'completed' && (
                        <>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => removeFile(file.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{formatFileSize(file.size)}</span>
                    {file.status === 'completed' && (
                      <Badge className="bg-success text-success-foreground">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Enviado
                      </Badge>
                    )}
                    {file.status === 'error' && (
                      <Badge variant="destructive">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Erro
                      </Badge>
                    )}
                  </div>
                  
                  {file.status === 'uploading' && (
                    <div className="space-y-1">
                      <Progress value={file.progress} className="h-1" />
                      <span className="text-xs text-muted-foreground">
                        Enviando... {file.progress}%
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}