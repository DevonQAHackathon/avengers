Feature: Blog
A site where you can publish your blog-posts.
Scenario: Publishing the blog-post
Given I am an author user
And I have a blog-post
When I go to the blog-post page
And I press the publish button
Then I should not see the error message
And the blog-post should be published  # Note: will query the database