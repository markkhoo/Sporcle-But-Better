# Sporcle But Better

## Site Picture
![Site]()

## Technologies Used
- CSS - adds styling to the webpage
- Javascript - adds special effects on pages
- Node.js - an open source server environment that uses JavaScript on the server
- MySQL - fully managed database service to deploy cloud-native applications
- Handlebars - compiles templates into JavaScript functions
- GitBash - for cloning repository and pushing code to GitHub
- GitHub - holds repository that deploys to GitHub Pages
- Chart.js - new library used to create charts with data on our server

## Summary
Sporcle But Better is an quiz game that tests your knowledge of world capitals. Once you log in, you can select a continent, then start the game. Capital cities will be displayed and you must select the corresponding country it belongs to. You get one point for every correct answer while you are being timed. Once you finish, your score and time will be recorded to your profile wherein you can see your top scores and charts with data on how you've progressed. There is also a leaderboard that ranks top scores of all users. Finally, the mainpage has a search bar that allows you to view the profile of other users. 

## Code Snippet
```javascript
router.get('/profile', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: 'password' },
            include: [
                {
                    model: Game,
                    include: {
                        model: Continent,
                    },
                },
            ],
        });
        const user = userData.get({ plain: true });

        res.render('/profile', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
```

```javascript
<javascript>

</javascript>
```

## Author Links 

Jake Novelli<br>
Mark Khoo<br>
Rosario Terese Miranda<br>
[LinkedIn](https://www.linkedin.com/in/rosario-miranda-b81170132/)<br />
[GitHub](https://github.com/rtmiranda18)