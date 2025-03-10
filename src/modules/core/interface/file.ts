interface IFileUpload {
  id: number;
  name: string;

  originalName: string;
  mimeType: string;
  fullPath: string;
  
  uploadId: string;
}

export interface IFile {
  id: number;
  name: string;
  originalName: string;
  path: string;
  fullPath: string;
  mimeType: string;
  uploadId: string;
  createdAt: string;
  updatedAt: string;
}
