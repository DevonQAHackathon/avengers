Feature: Blog
A site where you can publish your blog-posts.
Scenario: Modify an existing blog-post
Given I am an author user
And I have a blog-post
When I go to the blog-post page
And make any changes to the contents
And I press the Modify post button
Then I should not see the error message
And the modified content of blog-post should be updated in the database # Note: will query the database
And the blog-post should be published