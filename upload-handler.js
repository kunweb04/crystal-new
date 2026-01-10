const UPLOAD_ENDPOINT = 'https://crystal-lab-backend.your-domain.workers.dev/upload';

async function uploadToBackend(formData) {
    try {
        const response = await fetch(UPLOAD_ENDPOINT, {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`服务器响应错误: ${response.status} - ${errorText}`);
        }
        
        const result = await response.json();
        
        if (result.success) {
            return result;
        } else {
            throw new Error(result.message || '上传失败');
        }
    } catch (error) {
        console.error('上传错误:', error);
        throw error;
    }
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function validateFile(file, options = {}) {
    const { maxSize = 10 * 1024 * 1024, allowedTypes = [] } = options;
    
    if (file.size > maxSize) {
        return { valid: false, error: `文件大小不能超过 ${formatFileSize(maxSize)}` };
    }
    
    if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
        return { valid: false, error: '文件类型不支持' };
    }
    
    return { valid: true };
}