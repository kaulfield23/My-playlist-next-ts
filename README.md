# Before you start

You need to subscribe Spotify premium for using player in this website.

# In .env.local

```
CLIENT_ID = Spotify web api's ID in dashboard.

CLIENT_SECRET = Spotify web api account's password in dashboard.

SPOTIFY_ID = Your spotify ID.
```

# Get Client ID and secret in dashboard

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


# Other previews
- Player
![image](https://user-images.githubusercontent.com/77925373/177781765-788a5f51-de70-45ff-817d-4fce760b6ed7.png)
- Liked songs ( If you didn't subscribe Spotify Premium, then you will see this message in player)
![image](https://user-images.githubusercontent.com/77925373/177783059-00e8ea2e-d492-45b5-b222-2e284636c699.png)
- My Profile (fetches info from Spotify)
![image](https://user-images.githubusercontent.com/77925373/177782362-c7843c01-391b-4b3e-9922-4784cee30fb9.png)
- About me
![image](https://user-images.githubusercontent.com/77925373/177782773-80b00cf1-5718-46fd-8436-adfba0cd2690.png)



