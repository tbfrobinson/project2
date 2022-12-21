# twkward (pronounced talk-ward)

Lots of modern technologies feel temporary. Any app means to endless generate new content, users can return to old content but most will never be remembered. Twkward means to embrace that fully, structured as a set of temporary awkward community discussion, connected to a sample api. 
(idea was to use https://freesound.org/ but I don't think it will work after reading more, as well how the heck do I OAuth2 authenticate)

Users can create homepages that have samples played as they would like (like myspace maybe) and maybe have a memories for specific comments in discussions that they had. A brief, very short description. As well as active discussions they are in.


##Discussions:
Any user can create a discussion, which is just a space to discuss anything, purposefully vague, but can't be like shitty stuff ig. They can also choose the 'soundtrack' (maybe users can play a one time sample if they comment it?)
In discussions, users can write 7 characters at a time in a comment (awkward is 7 letters), which if they write uninturrupted become coherent, but new comments become a new line, interrupting.
Maybe add videos that are like 3 seconds? that become a slideshow if longer? Maybe pictures?
Discussions also delete themselves after a set time.
Maybe users can change the style of each discussion too? like reddit?

##Index:
User sign in/up or logged in
Recent comments in recent discussions, maybe it automatically updates and displays the five latest comments?

![RESTful routes](pics/RESTful.png)

Databases:
______________________
|       Users        | (hasMany Discussions, hasMany Comments)
| column name | type |
|:-----------:|:----:|
| id | integer |
| first_name | string |
| last_name | string |
| email | string |
| password | string |
| username | string |
____________________
|     Discussion    | (belongsTo User, hasMany Comments)
|:-----------:|:----:|
| id | integer |
| creatorId | integer |
| name | string |
_____________________
|      Comments      | (belongsTo User, belongsTo Discussion?)
|:-----------:|:----:|
| creatorId | integer |
| discussionId | integer |
| content | string(7) |
