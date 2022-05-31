RestaurantVote (vesrion 1.0)
===========================

What is it?
-----------

Application for choosing a restaurant to dine.
The rating of restaurants is made up of the number of users who voted

There are two types of users: admin and regular user.
Only the admin can add and manage restaurants, including changing the menu of restaurants.
A regular user can only manage their account and vote for their favorite restaurant.

If the user decides to change his voting decision, he can do it no later than the control time. The default is 11:00 am.

A stack of used technologies
----------------------------

JDK 11, Spring Boot 2.6.7, Spring Data JPA, Lombok, Junit5, Mockito, Swagger/OpenAPI

Application launch
------------------

After downloading the application and before launching it, you need to create and populate two databases, 
one for the main work and the other for tests. 

[SQL Scripts.zip](https://github.com/IgorMeshalkin/RestaurantVote/files/8802559/SQL.Scripts.zip)

You must use the MySQL database control system.

    Credentials:
    
    Admin:
    username: admin 
    password: admin

    User:
    username: ivan 
    password: ivan

Documentation
-------------

After running the application, the documentation is available at this address:
http://localhost:8080/swagger-ui/

Contacts
--------

My name is Igor Meshalkin. With pleasure I will answer your questions, 
and I will also be glad to suggestions for improving the application.

My Email: 770190@bk.ru

My WhatsApp: +79625000373
