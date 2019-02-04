{
    "name": "monorepo",
    "version": 2,
    "builds": [
        { "src": "www/package.json", "use": "@now/next" },
        { "src": "api/go/*.go", "use": "@now/go" },
        { "src": "api/python/*.py", "use": "@now/python" },
        { "src": "api/php/*.php", "use": "@now/php" },
        { "src": "api/node/*.js", "use": "@now/node" }
    ],
    "routes": [
        {
          "src": "/api/(.*)",
          "dest": "/api/$1"
        },
        {
          "src": "/redirect-test",
          "status": 302,
          "headers": {
            "location": "https://google.com"
          }
        },
        {
          "src": "/(.*)",
          "dest": "/www/$1",
          "headers": {
            "x-request-path": "$1"
          }
        }
    ]
}
