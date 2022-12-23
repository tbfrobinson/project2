# Online Gallery

Search engine for Harvard Art Museum's Api to display art or allow users to favorite art, leave comments on pieces' pages, and decorate a page with their favorite art.

Users can create homepages that have display favorited artwork in a layout they create. They can write brief descriptions of the artworks they show.


## Home page:
- Header that has home, user pages (that links to user page if logged in) log in and sign up / settings and log out
- Search bar to search API for works of art (with description and artist) by name, artist name, time period, 
- some links to sections that better organize artwork, basically just search buttons.

## User page:
- a search for users by username
- display favorited artworks
- edit your page somehow

## API:
The Harvard Art Musuem has an api.

![API response](pics/APIresponse.png)

![API code](pics/APIcode.png)


## MVP:
- User page and user creation
- Art search that displays pictures of art, description, time, and artist
- Comment functionality added to each show page of art
- Create a user page that users can edit the display of

## Stretch Goals:
- More user page options, changing the colors or drawing on anything.

## Index:
User sign in/up or logged in
Recent comments in recent discussions, maybe it automatically updates and displays the five latest comments?

![RESTful routes](pics/RESTful.png)
FORGOT DELETE USER OPTION

Databases:
![ERD routes](pics/ERD.png)


## Some Pages
Index:
![index](pics/Index.png)
Search Query
![search](pics/search/query.png)
Search Show
![search singular page](pics/search/shw.png)
User page (self view)
![user page](pics/social/id-self-view.png)
User page (other view)
![user page regular](pics/social/id.png)

## User stories:
- I want to be able to for artwork
- I want to have artwork suggested by type 
- I want to be able to put my favorited artworks on my user page
- I want to be able to edit the layout of my user page
- I want to be able to search for other users
