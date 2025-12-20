// functions/api/vote.js

// 投票选项配置
const VOTE_OPTIONS = [
  'crystal_1', 'crystal_2', 'crystal_3', 
  'crystal_4', 'crystal_5', 'crystal_6'
];

// CORS 头
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// 获取投票结果
async function getVoteResults(kv) {
  try {
    const totalVotes = parseInt(await kv.get('total_votes') || '0');
    const results = {
      totalVotes,
      options: {}
    };

    // 获取每个选项的票数
    for (const optionId of VOTE_OPTIONS) {
      const votes = parseInt(await kv.get(`option:${optionId}`) || '0');
      const percentage = totalVotes > 0 ? (votes / totalVotes) * 100 : 0;
      
      results.options[optionId] = {
        votes,
        percentage
      };
    }

    return results;
  } catch (error) {
    console.error('获取投票结果失败:', error);
    throw error;
  }
}

// 处理投票提交
async function handleVoteSubmit(request, env) {
  try {
    const body = await request.json();
    const { optionId, voterId } = body;

    // 验证输入
    if (!optionId || !voterId) {
      return new Response(JSON.stringify({
        success: false,
        error: '缺少必要参数'
      }), {
        status: 400,
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders 
        }
      });
    }

    if (!VOTE_OPTIONS.includes(optionId)) {
      return new Response(JSON.stringify({
        success: false,
        error: '无效的投票选项'
      }), {
        status: 400,
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders 
        }
      });
    }

    // 检查是否已经投票
    const hasVoted = await env.CRYSTAL_VOTES.get(`voter:${voterId}`);
    if (hasVoted) {
      return new Response(JSON.stringify({
        success: false,
        error: '您已经投过票了'
      }), {
        status: 400,
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders 
        }
      });
    }

    // 记录投票
    const voteTimestamp = Date.now();
    await env.CRYSTAL_VOTES.put(`voter:${voterId}`, optionId, { 
      expirationTtl: 60 * 60 * 24 * 30 // 30天过期
    });

    // 更新票数
    const currentVotes = await env.CRYSTAL_VOTES.get(`option:${optionId}`) || '0';
    const newVotes = parseInt(currentVotes) + 1;
    await env.CRYSTAL_VOTES.put(`option:${optionId}`, newVotes.toString());

    // 更新总票数
    const totalVotes = await env.CRYSTAL_VOTES.get('total_votes') || '0';
    const newTotalVotes = parseInt(totalVotes) + 1;
    await env.CRYSTAL_VOTES.put('total_votes', newTotalVotes.toString());

    console.log(`投票成功: ${voterId} -> ${optionId}`);

    return new Response(JSON.stringify({
      success: true,
      message: '投票成功'
    }), {
      headers: { 
        'Content-Type': 'application/json',
        ...corsHeaders 
      }
    });

  } catch (error) {
    console.error('投票处理失败:', error);
    return new Response(JSON.stringify({
      success: false,
      error: '投票处理失败'
    }), {
      status: 500,
      headers: { 
        'Content-Type': 'application/json',
        ...corsHeaders 
      }
    });
  }
}

// 主处理函数
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // 处理预检请求
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // 获取投票结果
    if (url.pathname === '/api/vote/results' && request.method === 'GET') {
      try {
        const results = await getVoteResults(env.CRYSTAL_VOTES);
        return new Response(JSON.stringify({
          success: true,
          data: results
        }), {
          headers: { 
            'Content-Type': 'application/json',
            ...corsHeaders 
          }
        });
      } catch (error) {
        return new Response(JSON.stringify({
          success: false,
          error: '获取投票结果失败'
        }), {
          status: 500,
          headers: { 
            'Content-Type': 'application/json',
            ...corsHeaders 
          }
        });
      }
    }

    // 提交投票
    if (url.pathname === '/api/vote' && request.method === 'POST') {
      return handleVoteSubmit(request, env);
    }

    // 404 处理
    return new Response(JSON.stringify({
      success: false,
      error: '接口不存在'
    }), {
      status: 404,
      headers: { 
        'Content-Type': 'application/json',
        ...corsHeaders 
      }
    });
  }
}