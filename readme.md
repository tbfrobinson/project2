# twkward (pronounced talk-ward)

Lots of modern technologies feel temporary. Any app means to endless generate new content, users can return to old content but most will never be remembered. Twkward means to embrace that fully, structured as a set of temporary awkward community discussion, connected to a sample api. 
(idea was to use https://freesound.org/ but I don't think it will work after reading more, as well how the heck do I OAuth2 authenticate) (second idea for the api is the art institue of chicago api; I couldn't make either connect though..)

Users can create homepages that have samples played as they would like (like myspace maybe) and maybe have a memories for specific comments in discussions that they had. A brief, very short description. As well as active discussions they are in.


## Discussions:
Any user can create a discussion, which is just a space to discuss anything, purposefully vague, but can't be like shitty stuff ig. The creator can also choose the 'soundtrack' 

In discussions, users can write 7 characters at a time in a comment (awkward is 7 letters), which if they write uninturrupted become coherent, but new comments become a new line, interrupting.

Comments automatically update and display the most recent

## other plan ? 
if this is too weird an idea, then I'm thinking of an online art gallery with the art institue of chicago api. Users can be created, users can leave comments on paintings or pieces, favorite them to add them to their  user page to display? if displaying them is an option. Delete functions would be to remove from favorites and delete comments. Edit comments and user profile. Let me know if this idea is better and I will restructure this readme.

## MVP:
- User page and user creation
- Discussion page and discussion creation (text only)
- Comment functionality added to discussions
- Connecting freesounds API and users can use samples from it on the user page (music bars to add things? music editing station)

## Stretch Goals:
- (maybe users can play a one time sample if they comment it in a discussion?)
- Add memories to user page(a few comments from a discussion)
- Maybe add videos that are like 3 seconds? that become a slideshow if longer? Maybe pictures?
- Discussions also delete themselves after a set time (3 days)
- Maybe users can change the style of each discussion too? like reddit?

## Index:
User sign in/up or logged in
Recent comments in recent discussions, maybe it automatically updates and displays the five latest comments?

![RESTful routes](pics/RESTful.png)
FORGOT DELETE USER OPTION

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

Do I need another table to link any of these? I want to say no but I don't know if I get that one.
_____________________
|      Comments      | (belongsTo User, belongsTo Discussion?)
|:-----------:|:----:|
| creatorId | integer |
| discussionId | integer |
| content | string(7) |


## User stories:
- what the frick is this thing
- why did that guy intrurrupt me
- where did my discussion from 4 days ago go?
- this idea is needlessly overcomplicated :)