Feature: Blog
A site where you can publish your blog-posts.
Scenario: Approve a comment
Given I am an author user
And I have a blog-post
When I go to the blog-post page
And I type text into the comment textbox
And I press the comment button
Then I should not see the error message
And the comment in the textbox should be published on the blog-post # Note: will query the database