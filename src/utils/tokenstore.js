// ​​Token 刷新（Token Refresh）​​ 是指当用户的身份认证令牌（Access Token）​​过期​​时，
// 自动获取新的有效令牌，而​​不需要用户手动重新登录​​的机制。
// 这是一种提升用户体验和保证安全性的重要实践。

/* 核心流程：​​
 ​1.​用户登录成功：​​
    服务器返回两个令牌：
 ​   ​Access Token（访问令牌）:​​ 用于访问受保护的资源（如 API 接口）。
    它​​有效期很短​​（例如：30 分钟）。
 ​   ​Refresh Token（刷新令牌）:​​ 专门用于获取新的 Access Token。
    它​​有效期较长​​（例如：7 天），并且通常存储在更安全的地方（如 HttpOnly Cookie 或安全存储区）。
 ​2.​用户操作中 Access Token 过期：​​
 当 Access Token 有效期结束，用户尝试调用需要认证的 API 时，
 后端服务器通常会返回一个特定的错误状态码
 （最常见的如 ​​HTTP 401 Unauthorized​​，但也可能通过专门的错误标识告知 Token 过期，如 err_code：invalid_token）。
 3.​​前端拦截过期响应：
 前端应用（通常在全局 HTTP 请求拦截器、Axios 拦截器）会捕捉到这个特定的过期错误
 4.发起 Token 刷新请求：
  前端在拦截器中，自动使用当前拥有的 ​​Refresh Token​​ 向服务器的专门端点（例如 /auth/refresh）发起请求，
 申请新的 Access Token（以及可能的新 Refresh Token）。
 5.服务器验证 Refresh Token：
 服务器收到刷新请求后，会验证提供的 Refresh Token：
 ​​有效且未过期？​​ 生成并返回新的 Access Token（和新的 Refresh Token）。
 ​​无效或已过期？​​ 返回刷新失败的错误（例如 HTTP 400 Bad Request）。
 6.前端更新 Token：
 如果刷新请求成功，前端收到新的 Access Token（和新的 Refresh Token）：
 用新的 Access Token 替换旧的值（存储在内存或安全存储中）。
 用新的 Refresh Token 替换旧的 Refresh Token（存储在 HttpOnly Cookie 或安全存储中）。
 ​​重新发送​​最初因为 Access Token 过期而失败的请求。
 7.​​处理刷新失败：
 如果刷新请求失败（如 Refresh Token 过期或被撤销），
 前端需要清楚所有存储的 Token（包括 Access Token 和 Refresh Token）,
 并将用户引导至登录页面重新登录。
 ​​图示流程：​*/