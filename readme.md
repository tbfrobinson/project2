# Online Gallery

This online social art gallery utilizes the Met Art Collection API as a source
to search for artwork that users can favorite and add to their personal gallery. Users' galleries are viewable by searching their username in the user database.

https://online-gallery2.herokuapp.com/

## home page:
- seader that has search, social, log in and sign up / settings and log out
- search bar to search API for works of art by name
- some links to sections that better organize artwork, basically just search buttons.

## social page:
- a search for users by username

## profile:
- display favorited artworks
- edit your page somehow


## API:
The Met API does not require users to register or obtain an API key, but asks that requests are limited to 80 per second.

![API search](pics/apisearch.png)
![API search code](pics/apisearchjs.png)
![API search response](pics/apisearchresponse.png)


![API object](pics/apiobject.png)
![API object code](pics/apiobjectjs.png)
![API object response](pics/apiobjectresponse.png)


## MVP:
- User page and user creation
- Art search that displays pictures of art, description, time, and artist
- Comment functionality added to each show page of art

## Stretch Goals:
- Create a user page that users can edit the display of
- More user page options, changing the colors or drawing on anything.
- feeling lucky button

## Index:
User sign in/up or logged in
Recent comments in recent discussions, maybe it automatically updates and displays the five latest comments?

![RESTful routes](pics/RESTful.png)

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
