export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        
        // CORS 设置
        const corsHeaders = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        };
        
        // 处理预检请求
        if (request.method === 'OPTIONS') {
            return new Response(null, { headers: corsHeaders });
        }
        
        // 处理上传请求
        if (url.pathname === '/upload' && request.method === 'POST') {
            return handleUpload(request, env);
        }
        
        return new Response('Not Found', { status: 404 });
    }
};

async function handleUpload(request, env) {
    try {
        const formData = await request.formData();
        const source = formData.get('source') || 'unknown';
        
        // 构建简单记录
        const record = {
            id: Date.now() + Math.random().toString(36).substr(2, 9),
            timestamp: new Date().toISOString(),
            source: source,
            ip: request.headers.get('cf-connecting-ip') || 'unknown',
            data: {}
        };
        
        // 收集文本数据
        for (const [key, value] of formData.entries()) {
            if (!(value instanceof File)) {
                record.data[key] = value;
            }
        }
        
        // 记录文件信息
        for (const [key, value] of formData.entries()) {
            if (value instanceof File) {
                record.data[`${key}_info`] = {
                    name: value.name,
                    size: value.size,
                    type: value.type,
                    uploaded: false // 不实际保存文件，只记录信息
                };
            }
        }
        
        // 发送通知到 Discord（可选）
        if (env.DISCORD_WEBHOOK_URL) {
            sendDiscordNotification(record, env.DISCORD_WEBHOOK_URL);
        }
        
        // 保存到 KV（可选）
        if (env.UPLOAD_LOGS) {
            await env.UPLOAD_LOGS.put(`log_${record.id}`, JSON.stringify(record));
        }
        
        // 发送到 Webhook（可选）
        if (env.WEBHOOK_URL) {
            sendToWebhook(record, env.WEBHOOK_URL);
        }
        
        return new Response(JSON.stringify({
            success: true,
            message: '提交成功！我们已收到您的投稿/建议',
            id: record.id
        }), {
            headers: {
                'Content-Type': 'application/json',
                ...corsHeaders
            }
        });
        
    } catch (error) {
        console.error('上传错误:', error);
        return new Response(JSON.stringify({
            success: false,
            message: '提交失败，请稍后重试'
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
                ...corsHeaders
            }
        });
    }
}

async function sendDiscordNotification(record, webhookUrl) {
    try {
        const embed = {
            title: `新${record.source === 'contribute' ? '投稿' : '建议'}: ${record.data.title || '无标题'}`,
            description: record.data.description ? 
                record.data.description.substring(0, 500) + 
                (record.data.description.length > 500 ? '...' : '') : 
                '无描述',
            color: record.source === 'contribute' ? 0x3498db : 0x2ecc71,
            fields: [
                {
                    name: '投稿人',
                    value: record.data.author || '匿名',
                    inline: true
                },
                {
                    name: '联系方式',
                    value: record.data.contact || '未提供',
                    inline: true
                },
                {
                    name: 'IP',
                    value: record.ip,
                    inline: true
                }
            ],
            footer: {
                text: `ID: ${record.id} • ${new Date(record.timestamp).toLocaleString('zh-CN')}`
            }
        };
        
        await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ embeds: [embed] })
        });
    } catch (error) {
        console.error('Discord通知失败:', error);
    }
}

async function sendToWebhook(record, webhookUrl) {
    try {
        await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(record)
        });
    } catch (error) {
        console.error('Webhook发送失败:', error);
    }
}