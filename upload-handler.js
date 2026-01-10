// ======================================================
// CrystalLab 上传处理器 v1.1.0
// ======================================================

// 配置区域 - 请根据实际情况修改
const UPLOAD_CONFIG = {
    // 🔧 替换为你的 Worker URL
    // 格式: https://你的worker名称.你的账户.workers.dev
    endpoint: 'https://crystallab-upload.enderwolf9487.workers.dev/upload',
    
    // 测试端点（用于检查连接）
    testEndpoint: 'https://crystallab-upload.enderwolf9487.workers.dev/test',
    
    // 健康检查端点
    healthEndpoint: 'https://crystallab-upload.enderwolf9487.workers.dev/health',
    
    // 文件大小限制（字节）
    fileLimits: {
        image: 10 * 1024 * 1024,      // 10MB
        video: 100 * 1024 * 1024,     // 100MB
        document: 20 * 1024 * 1024,   // 20MB
        audio: 10 * 1024 * 1024       // 10MB
    },
    
    // 允许的文件类型
    allowedTypes: {
        images: [
            'image/jpeg',
            'image/jpg',
            'image/png',
            'image/gif',
            'image/webp',
            'image/svg+xml',
            'image/bmp'
        ],
        videos: [
            'video/mp4',
            'video/mpeg',
            'video/quicktime',
            'video/x-msvideo',
            'video/x-ms-wmv',
            'video/webm'
        ],
        documents: [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'text/plain',
            'text/markdown',
            'application/json',
            'text/csv',
            'application/rtf'
        ],
        audio: [
            'audio/mpeg',
            'audio/mp3',
            'audio/wav',
            'audio/ogg',
            'audio/webm',
            'audio/aac'
        ]
    },
    
    // 最大文件数量
    maxFiles: {
        images: 10,
        videos: 1,
        documents: 5,
        total: 15
    },
    
    // 超时设置（毫秒）
    timeout: 30000, // 30秒
    
    // 是否显示调试信息
    debug: true
};

// ======================================================
// 上传处理器类
// ======================================================
class CrystalUploadHandler {
    constructor() {
        this.uploadQueue = [];
        this.isUploading = false;
        this.uploadProgress = {};
        this.abortController = null;
        this.uploadHistory = this.loadHistory();
        
        // 自动测试连接（开发环境）
        if (this.isDevelopment()) {
            this.autoTestConnection();
        }
    }
    
    // ======================================================
    // 核心上传方法
    // ======================================================
    
    /**
     * 上传数据到服务器
     * @param {Object} data - 要上传的数据对象
     * @param {string} source - 数据来源（contribute/suggestion等）
     * @returns {Promise<Object>} 上传结果
     */
    async upload(data, source = 'contribute') {
        if (!this.validateData(data, source)) {
            throw new Error('数据验证失败');
        }
        
        try {
            const formData = this.createFormData(data, source);
            
            // 设置超时
            this.abortController = new AbortController();
            const timeoutId = setTimeout(() => {
                this.abortController.abort();
                throw new Error('请求超时，请稍后重试');
            }, UPLOAD_CONFIG.timeout);
            
            // 发送请求
            const response = await fetch(UPLOAD_CONFIG.endpoint, {
                method: 'POST',
                body: formData,
                signal: this.abortController.signal
            });
            
            clearTimeout(timeoutId);
            
            // 处理响应
            if (!response.ok) {
                const errorText = await this.getErrorText(response);
                throw new Error(`服务器错误 (${response.status}): ${errorText}`);
            }
            
            const result = await response.json();
            
            if (result.success) {
                // 记录成功上传
                this.recordUpload({
                    id: result.id,
                    timestamp: result.timestamp,
                    source: source,
                    data: data,
                    files: result.files || []
                });
                
                return {
                    success: true,
                    data: result,
                    message: result.message || '提交成功！',
                    timestamp: result.timestamp
                };
            } else {
                throw new Error(result.message || '上传处理失败');
            }
            
        } catch (error) {
            this.handleUploadError(error);
            throw error;
        } finally {
            this.abortController = null;
        }
    }
    
    /**
     * 批量上传文件
     * @param {Array} files - 文件数组
     * @param {Object} metadata - 元数据
     * @param {Function} onProgress - 进度回调
     * @returns {Promise<Array>} 上传结果数组
     */
    async batchUpload(files, metadata = {}, onProgress = null) {
        const results = [];
        const totalFiles = files.length;
        
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            
            try {
                // 验证文件
                const validation = this.validateFile(file);
                if (!validation.valid) {
                    results.push({
                        success: false,
                        file: file.name,
                        error: validation.error
                    });
                    continue;
                }
                
                // 创建表单数据
                const formData = new FormData();
                formData.append('source', 'batch_upload');
                formData.append('file', file);
                formData.append('originalName', file.name);
                formData.append('fileIndex', i.toString());
                formData.append('totalFiles', totalFiles.toString());
                
                // 添加元数据
                Object.keys(metadata).forEach(key => {
                    formData.append(key, metadata[key]);
                });
                
                // 更新进度
                if (onProgress) {
                    onProgress({
                        total: totalFiles,
                        current: i + 1,
                        percent: Math.round(((i + 1) / totalFiles) * 100),
                        file: file.name
                    });
                }
                
                // 上传
                const response = await fetch(UPLOAD_CONFIG.endpoint, {
                    method: 'POST',
                    body: formData
                });
                
                const result = await response.json();
                
                if (result.success) {
                    results.push({
                        success: true,
                        file: file.name,
                        data: result,
                        url: result.files?.[0]?.url
                    });
                } else {
                    results.push({
                        success: false,
                        file: file.name,
                        error: result.message
                    });
                }
                
                // 延迟一下避免请求过快
                await this.delay(100);
                
            } catch (error) {
                results.push({
                    success: false,
                    file: file.name,
                    error: error.message
                });
            }
        }
        
        return results;
    }
    
    // ======================================================
    // 验证方法
    // ======================================================
    
    /**
     * 验证上传数据
     */
    validateData(data, source) {
        if (!data || typeof data !== 'object') {
            this.debugLog('数据必须是对象');
            return false;
        }
        
        // 检查必要字段（根据来源不同）
        const requiredFields = this.getRequiredFields(source);
        for (const field of requiredFields) {
            if (!data[field] || data[field].toString().trim() === '') {
                this.debugLog(`缺少必要字段: ${field}`);
                return false;
            }
        }
        
        // 检查文件数量限制
        const fileCount = this.countFiles(data);
        if (fileCount > UPLOAD_CONFIG.maxFiles.total) {
            this.debugLog(`文件数量超过限制: ${fileCount}/${UPLOAD_CONFIG.maxFiles.total}`);
            return false;
        }
        
        return true;
    }
    
    /**
     * 验证文件
     */
    validateFile(file, type = 'auto') {
        if (!(file instanceof File)) {
            return {
                valid: false,
                error: '无效的文件对象'
            };
        }
        
        // 检测文件类型
        const detectedType = this.detectFileType(file);
        const actualType = type === 'auto' ? detectedType : type;
        
        // 检查文件大小
        const sizeLimit = UPLOAD_CONFIG.fileLimits[actualType] || UPLOAD_CONFIG.fileLimits.image;
        if (file.size > sizeLimit) {
            return {
                valid: false,
                error: `文件太大，最大允许 ${this.formatFileSize(sizeLimit)}`
            };
        }
        
        // 检查文件类型
        const allowedTypes = this.getAllowedTypes(actualType);
        if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
            // 如果没有MIME类型，检查扩展名
            if (file.type === '' || file.type === 'application/octet-stream') {
                const extension = this.getFileExtension(file.name);
                const allowedExtensions = allowedTypes.map(t => 
                    t.split('/')[1] || t.split('/')[0]
                );
                
                if (!allowedExtensions.some(ext => 
                    extension.toLowerCase().includes(ext.toLowerCase())
                )) {
                    return {
                        valid: false,
                        error: `不支持的文件类型，请上传 ${allowedExtensions.join(', ')} 格式`
                    };
                }
            } else {
                return {
                    valid: false,
                    error: `不支持的文件类型，请上传 ${allowedTypes.map(t => t.split('/')[1]).join(', ')} 格式`
                };
            }
        }
        
        return { valid: true, type: detectedType };
    }
    
    /**
     * 批量验证文件
     */
    validateFiles(files, type = 'image') {
        const results = [];
        let totalSize = 0;
        
        for (const file of files) {
            const validation = this.validateFile(file, type);
            results.push({
                file: file,
                ...validation
            });
            
            if (validation.valid) {
                totalSize += file.size;
            }
        }
        
        // 检查总大小
        const maxTotalSize = UPLOAD_CONFIG.fileLimits[type] * UPLOAD_CONFIG.maxFiles[type + 's'] || 50 * 1024 * 1024;
        if (totalSize > maxTotalSize) {
            return {
                allValid: false,
                results: results,
                error: `所有文件总大小超过限制 (${this.formatFileSize(maxTotalSize)})`
            };
        }
        
        const allValid = results.every(r => r.valid);
        return {
            allValid: allValid,
            results: results,
            totalSize: totalSize
        };
    }
    
    // ======================================================
    // 辅助方法
    // ======================================================
    
    /**
     * 创建表单数据
     */
    createFormData(data, source) {
        const formData = new FormData();
        
        // 添加元数据
        formData.append('source', source);
        formData.append('timestamp', new Date().toISOString());
        formData.append('userAgent', navigator.userAgent);
        formData.append('referrer', document.referrer || window.location.href);
        
        // 添加数据字段
        Object.keys(data).forEach(key => {
            const value = data[key];
            
            if (value instanceof File) {
                formData.append(key, value);
            } else if (Array.isArray(value)) {
                value.forEach((item, index) => {
                    if (item instanceof File) {
                        formData.append(`${key}[${index}]`, item);
                    } else if (item !== null && item !== undefined) {
                        formData.append(`${key}[${index}]`, String(item));
                    }
                });
            } else if (value !== null && value !== undefined) {
                formData.append(key, String(value));
            }
        });
        
        return formData;
    }
    
    /**
     * 格式化文件大小
     */
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        if (bytes < 1024) return bytes + ' Bytes';
        
        const units = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        
        return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + units[i];
    }
    
    /**
     * 检测文件类型
     */
    detectFileType(file) {
        const type = file.type.toLowerCase();
        
        if (type.startsWith('image/')) return 'image';
        if (type.startsWith('video/')) return 'video';
        if (type.startsWith('audio/')) return 'audio';
        if (type.includes('pdf') || type.includes('document') || type.includes('text')) {
            return 'document';
        }
        
        // 根据扩展名判断
        const extension = this.getFileExtension(file.name).toLowerCase();
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg'];
        const videoExtensions = ['.mp4', '.mov', '.avi', '.wmv', '.webm', '.mkv'];
        const audioExtensions = ['.mp3', '.wav', '.ogg', '.m4a', '.aac'];
        const documentExtensions = ['.pdf', '.doc', '.docx', '.txt', '.md', '.json', '.csv', '.rtf'];
        
        if (imageExtensions.includes(extension)) return 'image';
        if (videoExtensions.includes(extension)) return 'video';
        if (audioExtensions.includes(extension)) return 'audio';
        if (documentExtensions.includes(extension)) return 'document';
        
        return 'unknown';
    }
    
    /**
     * 获取文件扩展名
     */
    getFileExtension(filename) {
        return '.' + filename.split('.').pop().toLowerCase();
    }
    
    /**
     * 计算文件数量
     */
    countFiles(data) {
        let count = 0;
        
        Object.keys(data).forEach(key => {
            const value = data[key];
            
            if (value instanceof File) {
                count++;
            } else if (Array.isArray(value)) {
                count += value.filter(item => item instanceof File).length;
            }
        });
        
        return count;
    }
    
    /**
     * 获取必要字段
     */
    getRequiredFields(source) {
        const baseFields = ['title', 'author'];
        
        switch (source) {
            case 'contribute':
                return [...baseFields, 'description'];
            case 'suggestion':
                return [...baseFields, 'description'];
            default:
                return baseFields;
        }
    }
    
    /**
     * 获取允许的文件类型
     */
    getAllowedTypes(fileType) {
        switch (fileType) {
            case 'image': return UPLOAD_CONFIG.allowedTypes.images;
            case 'video': return UPLOAD_CONFIG.allowedTypes.videos;
            case 'document': return UPLOAD_CONFIG.allowedTypes.documents;
            case 'audio': return UPLOAD_CONFIG.allowedTypes.audio;
            default: return [];
        }
    }
    
    // ======================================================
    // 连接测试
    // ======================================================
    
    /**
     * 测试服务器连接
     */
    async testConnection(endpoint = null) {
        const testUrl = endpoint || UPLOAD_CONFIG.testEndpoint || UPLOAD_CONFIG.endpoint.replace('/upload', '/test');
        
        try {
            const response = await fetch(testUrl, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (!response.ok) {
                return {
                    success: false,
                    endpoint: testUrl,
                    status: response.status,
                    message: `服务器返回错误: ${response.status}`
                };
            }
            
            const data = await response.json();
            
            return {
                success: true,
                endpoint: testUrl,
                status: response.status,
                data: data,
                message: '连接测试成功'
            };
            
        } catch (error) {
            return {
                success: false,
                endpoint: testUrl,
                error: error.message,
                message: `连接失败: ${error.message}`
            };
        }
    }
    
    /**
     * 健康检查
     */
    async healthCheck() {
        try {
            const response = await fetch(UPLOAD_CONFIG.healthEndpoint, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (!response.ok) {
                return {
                    healthy: false,
                    status: response.status,
                    message: '服务不可用'
                };
            }
            
            const data = await response.json();
            
            return {
                healthy: true,
                status: response.status,
                data: data,
                message: '服务运行正常'
            };
            
        } catch (error) {
            return {
                healthy: false,
                error: error.message,
                message: '服务连接失败'
            };
        }
    }
    
    /**
     * 自动测试连接（开发环境）
     */
    async autoTestConnection() {
        console.log('🔄 正在测试 Worker 连接...');
        
        const connectionTest = await this.testConnection();
        
        if (connectionTest.success) {
            console.log('✅ Worker 连接正常:', connectionTest.endpoint);
            
            // 同时检查健康状态
            const healthCheck = await this.healthCheck();
            if (healthCheck.healthy) {
                console.log('✅ Worker 健康状态: 正常');
            } else {
                console.warn('⚠️ Worker 健康状态: 异常', healthCheck.message);
            }
        } else {
            console.error('❌ Worker 连接失败:', connectionTest.message);
            console.warn('请检查:');
            console.warn('1. Worker 是否已部署');
            console.warn('2. Worker URL 是否正确:', UPLOAD_CONFIG.endpoint);
            console.warn('3. 是否配置了正确的 CORS 头');
        }
    }
    
    // ======================================================
    // 错误处理
    // ======================================================
    
    /**
     * 获取错误文本
     */
    async getErrorText(response) {
        try {
            return await response.text();
        } catch {
            return '无法读取错误信息';
        }
    }
    
    /**
     * 处理上传错误
     */
    handleUploadError(error) {
        let userMessage = '上传失败，请稍后重试';
        
        if (error.name === 'AbortError') {
            userMessage = '请求超时，请检查网络连接';
        } else if (error.message.includes('Failed to fetch')) {
            userMessage = '无法连接到服务器，请检查: 1) Worker 是否运行 2) 网络连接';
        } else if (error.message.includes('NetworkError')) {
            userMessage = '网络错误，请检查网络连接';
        } else if (error.message.includes('Network request failed')) {
            userMessage = '网络请求失败，可能是跨域问题';
        } else if (error.message.includes('CORS')) {
            userMessage = '跨域请求被阻止，请检查服务器CORS配置';
        } else if (error.message.includes('413')) {
            userMessage = '文件太大，请压缩或选择较小的文件';
        } else if (error.message.includes('404')) {
            userMessage = '服务器地址错误，请检查配置';
        } else if (error.message.includes('500')) {
            userMessage = '服务器内部错误，请稍后重试';
        }
        
        this.debugLog('上传错误:', {
            message: error.message,
            name: error.name,
            stack: error.stack,
            userMessage: userMessage
        });
        
        return userMessage;
    }
    
    // ======================================================
    // 历史记录管理
    // ======================================================
    
    /**
     * 加载上传历史
     */
    loadHistory() {
        try {
            const history = localStorage.getItem('crystalUploadHistory');
            return history ? JSON.parse(history) : [];
        } catch {
            return [];
        }
    }
    
    /**
     * 保存上传历史
     */
    saveHistory() {
        try {
            localStorage.setItem('crystalUploadHistory', JSON.stringify(this.uploadHistory));
        } catch (error) {
            console.warn('无法保存上传历史:', error);
        }
    }
    
    /**
     * 记录上传
     */
    recordUpload(record) {
        // 只保留最近50条记录
        this.uploadHistory.unshift(record);
        if (this.uploadHistory.length > 50) {
            this.uploadHistory = this.uploadHistory.slice(0, 50);
        }
        
        this.saveHistory();
    }
    
    /**
     * 获取上传历史
     */
    getUploadHistory(limit = 10) {
        return this.uploadHistory.slice(0, limit);
    }
    
    /**
     * 清空历史记录
     */
    clearHistory() {
        this.uploadHistory = [];
        this.saveHistory();
    }
    
    // ======================================================
    // 工具方法
    // ======================================================
    
    /**
     * 延迟函数
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    /**
     * 判断是否开发环境
     */
    isDevelopment() {
        return window.location.hostname === 'localhost' || 
               window.location.hostname === '127.0.0.1' ||
               window.location.hostname.includes('.pages.dev');
    }
    
    /**
     * 调试日志
     */
    debugLog(...args) {
        if (UPLOAD_CONFIG.debug) {
            console.log('[CrystalUpload]', ...args);
        }
    }
    
    /**
     * 取消当前上传
     */
    cancelUpload() {
        if (this.abortController) {
            this.abortController.abort();
            this.debugLog('上传已取消');
            return true;
        }
        return false;
    }
    
    /**
     * 生成文件预览URL
     */
    createFilePreview(file) {
        return new Promise((resolve, reject) => {
            if (!(file instanceof File)) {
                reject(new Error('无效的文件对象'));
                return;
            }
            
            const reader = new FileReader();
            
            reader.onload = (e) => {
                resolve(e.target.result);
            };
            
            reader.onerror = () => {
                reject(new Error('文件读取失败'));
            };
            
            if (file.type.startsWith('image/')) {
                reader.readAsDataURL(file);
            } else {
                // 对于非图片文件，返回一个占位符
                resolve(this.getFileIcon(file));
            }
        });
    }
    
    /**
     * 获取文件图标
     */
    getFileIcon(file) {
        const type = this.detectFileType(file);
        const extension = this.getFileExtension(file.name);
        
        const icons = {
            image: '🖼️',
            video: '🎬',
            audio: '🎵',
            document: '📄',
            pdf: '📕',
            text: '📝',
            default: '📎'
        };
        
        if (extension === '.pdf') return icons.pdf;
        if (file.type.includes('text')) return icons.text;
        
        return icons[type] || icons.default;
    }
    
    /**
     * 获取上传配置
     */
    getConfig() {
        return {
            ...UPLOAD_CONFIG,
            endpoint: UPLOAD_CONFIG.endpoint,
            limits: UPLOAD_CONFIG.fileLimits,
            maxFiles: UPLOAD_CONFIG.maxFiles
        };
    }
    
    /**
     * 更新配置
     */
    updateConfig(newConfig) {
        Object.assign(UPLOAD_CONFIG, newConfig);
        this.debugLog('配置已更新:', newConfig);
    }
}

// ======================================================
// 全局实例和辅助函数
// ======================================================

// 创建全局实例
const crystalUpload = new CrystalUploadHandler();

// 导出全局函数
window.CrystalUpload = {
    // 核心方法
    upload: (data, source) => crystalUpload.upload(data, source),
    batchUpload: (files, metadata, onProgress) => crystalUpload.batchUpload(files, metadata, onProgress),
    
    // 验证方法
    validateFile: (file, type) => crystalUpload.validateFile(file, type),
    validateFiles: (files, type) => crystalUpload.validateFiles(files, type),
    validateData: (data, source) => crystalUpload.validateData(data, source),
    
    // 工具方法
    formatFileSize: (bytes) => crystalUpload.formatFileSize(bytes),
    createFilePreview: (file) => crystalUpload.createFilePreview(file),
    detectFileType: (file) => crystalUpload.detectFileType(file),
    
    // 测试方法
    testConnection: (endpoint) => crystalUpload.testConnection(endpoint),
    healthCheck: () => crystalUpload.healthCheck(),
    
    // 历史记录
    getHistory: (limit) => crystalUpload.getUploadHistory(limit),
    clearHistory: () => crystalUpload.clearHistory(),
    
    // 配置
    getConfig: () => crystalUpload.getConfig(),
    updateConfig: (config) => crystalUpload.updateConfig(config),
    
    // 控制
    cancel: () => crystalUpload.cancelUpload(),
    
    // 实例访问
    instance: crystalUpload
};

// 自动初始化
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 CrystalLab 上传处理器已加载');
    console.log('📊 配置信息:', {
        endpoint: UPLOAD_CONFIG.endpoint,
        debug: UPLOAD_CONFIG.debug,
        limits: UPLOAD_CONFIG.fileLimits
    });
    
    // 如果是开发环境，自动测试连接
    if (crystalUpload.isDevelopment()) {
        setTimeout(() => {
            crystalUpload.autoTestConnection();
        }, 1000);
    }
});

// 导出供模块化使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CrystalUpload: window.CrystalUpload };
}

// ======================================================
// 文件预览组件（可选）
// ======================================================

/**
 * 文件预览组件类
 */
class FilePreviewComponent {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        this.files = [];
        this.options = {
            maxFiles: 10,
            maxSize: 10 * 1024 * 1024,
            allowedTypes: ['image/*', 'video/*', 'application/pdf', 'text/*'],
            showSize: true,
            showRemove: true,
            ...options
        };
        
        if (this.container) {
            this.init();
        }
    }
    
    init() {
        this.container.innerHTML = `
            <div class="file-preview-container">
                <div class="file-drop-area">
                    <i class="fas fa-cloud-upload-alt"></i>
                    <p>拖放文件到此处，或点击选择文件</p>
                    <input type="file" multiple class="file-input">
                </div>
                <div class="file-list"></div>
                <div class="file-info">
                    <span class="file-count">0 个文件</span>
                    <span class="file-size">0 B</span>
                </div>
            </div>
        `;
        
        this.fileList = this.container.querySelector('.file-list');
        this.fileInput = this.container.querySelector('.file-input');
        this.fileCountEl = this.container.querySelector('.file-count');
        this.fileSizeEl = this.container.querySelector('.file-size');
        
        this.setupEventListeners();
        this.updateFileInfo();
    }
    
    setupEventListeners() {
        // 文件输入变化
        this.fileInput.addEventListener('change', (e) => {
            this.handleFiles(e.target.files);
        });
        
        // 拖放功能
        const dropArea = this.container.querySelector('.file-drop-area');
        
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, this.preventDefaults, false);
        });
        
        ['dragenter', 'dragover'].forEach(eventName => {
            dropArea.addEventListener(eventName, () => {
                dropArea.classList.add('dragover');
            }, false);
        });
        
        ['dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, () => {
                dropArea.classList.remove('dragover');
            }, false);
        });
        
        dropArea.addEventListener('drop', (e) => {
            const dt = e.dataTransfer;
            const files = dt.files;
            this.handleFiles(files);
        }, false);
        
        // 点击触发文件选择
        dropArea.addEventListener('click', () => {
            this.fileInput.click();
        });
    }
    
    handleFiles(fileList) {
        const files = Array.from(fileList);
        
        // 验证文件
        files.forEach(file => {
            const validation = crystalUpload.validateFile(file);
            
            if (validation.valid) {
                // 检查数量限制
                if (this.files.length >= this.options.maxFiles) {
                    alert(`最多只能上传 ${this.options.maxFiles} 个文件`);
                    return;
                }
                
                this.files.push(file);
                this.addFilePreview(file);
            } else {
                alert(`文件 "${file.name}" 无效: ${validation.error}`);
            }
        });
        
        this.updateFileInfo();
    }
    
    addFilePreview(file) {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.dataset.name = file.name;
        
        const preview = document.createElement('div');
        preview.className = 'file-preview';
        
        const info = document.createElement('div');
        info.className = 'file-info';
        
        const name = document.createElement('div');
        name.className = 'file-name';
        name.textContent = file.name;
        
        const size = document.createElement('div');
        size.className = 'file-size';
        size.textContent = crystalUpload.formatFileSize(file.size);
        
        const type = document.createElement('div');
        type.className = 'file-type';
        type.textContent = file.type || '未知类型';
        
        info.appendChild(name);
        info.appendChild(size);
        info.appendChild(type);
        
        // 创建预览
        crystalUpload.createFilePreview(file)
            .then(previewUrl => {
                if (typeof previewUrl === 'string' && previewUrl.startsWith('data:')) {
                    const img = document.createElement('img');
                    img.src = previewUrl;
                    preview.appendChild(img);
                } else {
                    preview.textContent = previewUrl;
                    preview.className += ' file-icon';
                }
            })
            .catch(() => {
                preview.textContent = crystalUpload.getFileIcon(file);
                preview.className += ' file-icon';
            });
        
        // 移除按钮
        if (this.options.showRemove) {
            const removeBtn = document.createElement('button');
            removeBtn.className = 'file-remove';
            removeBtn.innerHTML = '<i class="fas fa-times"></i>';
            removeBtn.addEventListener('click', () => {
                this.removeFile(file.name);
            });
            
            fileItem.appendChild(removeBtn);
        }
        
        fileItem.appendChild(preview);
        fileItem.appendChild(info);
        this.fileList.appendChild(fileItem);
    }
    
    removeFile(fileName) {
        this.files = this.files.filter(f => f.name !== fileName);
        
        const fileItem = this.fileList.querySelector(`[data-name="${fileName}"]`);
        if (fileItem) {
            fileItem.remove();
        }
        
        this.updateFileInfo();
    }
    
    updateFileInfo() {
        const totalSize = this.files.reduce((sum, file) => sum + file.size, 0);
        
        this.fileCountEl.textContent = `${this.files.length} 个文件`;
        this.fileSizeEl.textContent = crystalUpload.formatFileSize(totalSize);
    }
    
    getFiles() {
        return [...this.files];
    }
    
    clearFiles() {
        this.files = [];
        this.fileList.innerHTML = '';
        this.updateFileInfo();
    }
    
    preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
}

// 导出文件预览组件
window.FilePreview = FilePreviewComponent;

// 添加默认样式
const style = document.createElement('style');
style.textContent = `
.file-preview-container {
    border: 2px dashed #3498db;
    border-radius: 10px;
    padding: 20px;
    background: rgba(52, 152, 219, 0.05);
    transition: all 0.3s ease;
}

.file-preview-container:hover {
    border-color: #2980b9;
    background: rgba(52, 152, 219, 0.1);
}

.file-drop-area {
    text-align: center;
    padding: 30px;
    cursor: pointer;
    color: #3498db;
}

.file-drop-area i {
    font-size: 48px;
    margin-bottom: 15px;
    opacity: 0.7;
}

.file-drop-area p {
    margin: 10px 0;
    font-size: 16px;
    color: #555;
}

.file-drop-area.dragover {
    background: rgba(52, 152, 219, 0.2);
    border-color: #2980b9;
}

.file-input {
    display: none;
}

.file-list {
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 15px;
}

.file-item {
    position: relative;
    background: white;
    border-radius: 8px;
    padding: 10px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    transition: transform 0.2s;
}

.file-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0,0,0,0.15);
}

.file-preview {
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: 5px;
    background: #f8f9fa;
    margin-bottom: 10px;
}

.file-preview img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}

.file-preview.file-icon {
    font-size: 36px;
}

.file-info {
    font-size: 12px;
}

.file-name {
    font-weight: 600;
    color: #2c3e50;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 5px;
}

.file-size, .file-type {
    color: #7f8c8d;
    font-size: 11px;
}

.file-remove {
    position: absolute;
    top: 5px;
    right: 5px;
    background: #e74c3c;
    color: white;
    border: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    opacity: 0.7;
    transition: opacity 0.2s;
}

.file-remove:hover {
    opacity: 1;
}

.file-info-bar {
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: #555;
    padding: 10px;
    background: rgba(52, 152, 219, 0.1);
    border-radius: 5px;
}
`;
document.head.appendChild(style);