// 上传端点配置
const UPLOAD_ENDPOINTS = {
    production: 'https://upload.your-workers-domain.workers.dev/upload',
    development: 'http://localhost:8787/upload'
};

// 自动检测环境
function getUploadEndpoint() {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return UPLOAD_ENDPOINTS.development;
    }
    return UPLOAD_ENDPOINTS.production;
}

// 主上传函数
async function uploadToBackend(formData) {
    const endpoint = getUploadEndpoint();
    
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error(`服务器错误: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.success) {
            return {
                success: true,
                data: result,
                message: result.message || '提交成功！'
            };
        } else {
            throw new Error(result.message || '上传失败');
        }
    } catch (error) {
        console.error('上传失败:', error);
        throw error;
    }
}

// 文件验证
function validateFile(file, options = {}) {
    const { maxSize = 10 * 1024 * 1024 } = options;
    
    if (file.size > maxSize) {
        return {
            valid: false,
            error: `文件太大，最大 ${formatFileSize(maxSize)}`
        };
    }
    
    return { valid: true };
}

// 格式化文件大小
function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' Bytes';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

// 创建表单数据
function createUploadFormData(data, source) {
    const formData = new FormData();
    formData.append('source', source);
    
    // 添加所有数据
    Object.keys(data).forEach(key => {
        if (data[key] instanceof File) {
            formData.append(key, data[key]);
        } else if (Array.isArray(data[key])) {
            data[key].forEach(item => {
                formData.append(key, item);
            });
        } else {
            formData.append(key, data[key]);
        }
    });
    
    return formData;
}

// 导出函数
window.CrystalUpload = {
    uploadToBackend,
    validateFile,
    formatFileSize,
    createUploadFormData
};