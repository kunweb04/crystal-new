// 上传配置
const UPLOAD_CONFIG = {
    endpoint: 'https://crystallab-upload.enderwolf9487.workers.dev',
    
    // 文件大小限制
    limits: {
        image: 10 * 1024 * 1024, // 10MB
        video: 100 * 1024 * 1024, // 100MB
        document: 20 * 1024 * 1024 // 20MB
    }
};

class UploadHandler {
    constructor() {
        this.queue = [];
        this.isUploading = false;
    }
    
    async upload(data, source = 'contribute') {
        try {
            const formData = new FormData();
            formData.append('source', source);
            formData.append('timestamp', new Date().toISOString());
            
            // 添加所有数据到 FormData
            Object.keys(data).forEach(key => {
                if (data[key] instanceof File) {
                    formData.append(key, data[key]);
                } else if (Array.isArray(data[key]) && data[key].every(item => item instanceof File)) {
                    data[key].forEach(file => {
                        formData.append(key, file);
                    });
                } else {
                    formData.append(key, String(data[key]));
                }
            });
            
            const response = await fetch(UPLOAD_CONFIG.endpoint, {
                method: 'POST',
                body: formData
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`上传失败: ${response.status} ${errorText}`);
            }
            
            const result = await response.json();
            
            if (result.success) {
                return {
                    success: true,
                    data: result,
                    message: result.message || '提交成功'
                };
            } else {
                throw new Error(result.message || '上传失败');
            }
        } catch (error) {
            console.error('Upload error:', error);
            throw error;
        }
    }
    
    validateFile(file, type = 'image') {
        const maxSize = UPLOAD_CONFIG.limits[type] || UPLOAD_CONFIG.limits.image;
        
        if (file.size > maxSize) {
            return {
                valid: false,
                error: `文件大小不能超过 ${this.formatFileSize(maxSize)}`
            };
        }
        
        return { valid: true };
    }
    
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    createFormDataFromElements(formId) {
        const form = document.getElementById(formId);
        if (!form) return null;
        
        const formData = new FormData();
        const elements = form.elements;
        
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            
            if (element.type === 'file') {
                // 处理文件输入
                if (element.files) {
                    for (let j = 0; j < element.files.length; j++) {
                        formData.append(element.name, element.files[j]);
                    }
                }
            } else if (element.type === 'checkbox' || element.type === 'radio') {
                if (element.checked) {
                    formData.append(element.name, element.value);
                }
            } else if (element.type !== 'submit' && element.type !== 'button') {
                formData.append(element.name, element.value);
            }
        }
        
        return formData;
    }
}

// 创建全局实例
window.crystalUpload = new UploadHandler();