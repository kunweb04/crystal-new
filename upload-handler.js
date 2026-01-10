// upload-handler.js - 前端上传处理
// 替换这个URL为你的Worker URL
const WORKER_URL = 'https://crystallab-upload.enderwolf9487.workers.dev';

class CrystalUpload {
    constructor() {
        this.endpoint = `${WORKER_URL}/upload`;
        this.testEndpoint = `${WORKER_URL}/test`;
        this.isTesting = false;
    }
    
    // 测试连接
    async testConnection() {
        try {
            const response = await fetch(this.testEndpoint, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error(`测试失败: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('Worker连接测试成功:', data);
            return { success: true, data };
        } catch (error) {
            console.error('Worker连接测试失败:', error);
            return { 
                success: false, 
                error: error.message,
                endpoint: this.testEndpoint
            };
        }
    }
    
    // 上传数据
    async upload(data, source = 'contribute') {
        try {
            const formData = new FormData();
            
            // 添加源标识
            formData.append('source', source);
            
            // 添加所有数据
            Object.keys(data).forEach(key => {
                const value = data[key];
                
                if (value instanceof File) {
                    formData.append(key, value);
                } else if (Array.isArray(value)) {
                    value.forEach(item => {
                        if (item instanceof File) {
                            formData.append(key, item);
                        } else {
                            formData.append(key, String(item));
                        }
                    });
                } else {
                    formData.append(key, String(value));
                }
            });
            
            console.log('准备上传数据:', {
                source: source,
                endpoint: this.endpoint,
                dataKeys: Object.keys(data),
                hasFiles: Object.keys(data).some(key => data[key] instanceof File || 
                    (Array.isArray(data[key]) && data[key][0] instanceof File))
            });
            
            const response = await fetch(this.endpoint, {
                method: 'POST',
                body: formData,
                // 注意：不要手动设置Content-Type，浏览器会自动设置multipart/form-data
            });
            
            console.log('上传响应状态:', response.status);
            
            if (!response.ok) {
                let errorText = '';
                try {
                    errorText = await response.text();
                } catch (e) {
                    errorText = '无法读取响应内容';
                }
                throw new Error(`上传失败 (${response.status}): ${errorText}`);
            }
            
            const result = await response.json();
            console.log('上传响应数据:', result);
            
            if (result.success) {
                return {
                    success: true,
                    data: result,
                    message: result.message || '提交成功'
                };
            } else {
                throw new Error(result.message || '上传处理失败');
            }
        } catch (error) {
            console.error('上传过程中出错:', error);
            
            // 提供更友好的错误信息
            let userMessage = '提交失败，请稍后重试';
            
            if (error.message.includes('Failed to fetch')) {
                userMessage = '无法连接到服务器，请检查网络连接';
            } else if (error.message.includes('NetworkError')) {
                userMessage = '网络错误，请检查网络连接';
            } else if (error.message.includes('timeout')) {
                userMessage = '请求超时，请稍后重试';
            }
            
            throw new Error(`${userMessage} (${error.message})`);
        }
    }
    
    // 验证文件
    validateFile(file, options = {}) {
        const defaults = {
            maxSize: 10 * 1024 * 1024, // 10MB
            allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']
        };
        
        const config = { ...defaults, ...options };
        
        if (file.size > config.maxSize) {
            return {
                valid: false,
                error: `文件大小不能超过 ${this.formatFileSize(config.maxSize)}`
            };
        }
        
        if (config.allowedTypes.length > 0 && !config.allowedTypes.includes(file.type)) {
            return {
                valid: false,
                error: `不支持的文件类型，请上传图片文件 (JPG, PNG, GIF, WEBP, SVG)`
            };
        }
        
        return { valid: true };
    }
    
    // 格式化文件大小
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    // 创建表单数据
    createFormData(data, source) {
        const formData = new FormData();
        formData.append('source', source);
        
        Object.keys(data).forEach(key => {
            const value = data[key];
            
            if (value instanceof File) {
                formData.append(key, value);
            } else if (Array.isArray(value) && value.every(item => item instanceof File)) {
                value.forEach(file => {
                    formData.append(key, file);
                });
            } else if (Array.isArray(value)) {
                value.forEach(item => {
                    formData.append(key, String(item));
                });
            } else {
                formData.append(key, String(value));
            }
        });
        
        return formData;
    }
}

// 创建全局实例
window.CrystalUpload = new CrystalUpload();

// 自动测试连接（开发环境）
if (window.location.hostname === 'localhost' || window.location.hostname.includes('127.0.0.1')) {
    console.log('开发环境：自动测试Worker连接...');
    window.CrystalUpload.testConnection().then(result => {
        if (!result.success) {
            console.warn('Worker连接测试失败，请检查配置');
        }
    });
}