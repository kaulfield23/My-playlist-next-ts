# Before you start

You need to subscribe Spotify premium for using player in this website.

# In .env.local

```
CLIENT_ID = Spotify web api's ID in dashboard.

CLIENT_SECRET = Spotify web api account's password in dashboard.

SPOTIFY_ID = Your spotify ID.
```

# Get Client ID and secret

https://developer.spotify.com/documentation/web-api/

## After get ID and secret

- Add http://localhost:3000 and http://localhost:3000/playlist in your dashboard for redirecting.


# What I learned
- Responsive page with Material UI
![image](https://user-images.githubusercontent.com/77925373/177778890-2194b28c-734a-4b8b-bf60-c6df2045c15d.png)
- Load specific datas by using intersection observer
![image](https://user-images.githubusercontent.com/77925373/177779384-929f89b5-0e4c-4c7a-a645-424a6d811382.png)
- How to use Spotify API
- Refresh token when it expires
- SSR by using getServerSideProps of Next.js
