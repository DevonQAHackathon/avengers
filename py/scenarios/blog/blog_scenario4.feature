Feature: Blog
A site where you can publish your blog-posts.
Scenario: Delete an existing blog-post
Given I am an author user
And I have a blog-post
When I go to the blog-post page
And I press the Delete post button
Then I should not see the error message
And the blog-post should be deleted from the database # Note: will query the database
And the blog-post should no longer be published