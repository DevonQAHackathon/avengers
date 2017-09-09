Feature: Blog
A site where you can publish your blog-posts.
Scenario: Login into the blog
Given a valid username and password exists in the login database
When I go to the blog-post page
And provide a valid username
And provide the corresponding valid password
And I press the Login button
Then I should not see the error message
And I should be an author user now  # Note: will query the database