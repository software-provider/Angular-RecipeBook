# Angular 10 - C# .NET 5 Web API - How to build a Simple CRUD Example Application with Angular 10 and .NET 5 Web API [Year of Development: 2020]

About the application technologies and operation:

### Technologies:

- Programming Language: C# - TypeScript
- FrontEnd Side: Angular CLI 10.2.0 (Node: 14.5.0)
- BackEnd Side: .NET 5 (Web API)
- Descriptive Language: HTML5
- Style Description Language: SCSS (Bootstrap 4.5.3)
- Other used modul FrontEnd Side:
  - rxjs (^6.6.3)
  - fortawesome/angular-fontawesome (^0.7.0)
  - fortawesome/fontawesome-svg-core (^1.2.32)
  - fortawesome/free-solid-svg-icons (^5.15.1)
  - ng-bootstrap/ng-bootstrap (^8.0.0)
  - ng-sidebar (^9.4.2)
  - ngx-avatar (^4.0.0)
  - ngx-currency (^2.5.2)
  - ngx-spinner (^10.0.1)
  - ngx-toastr (^13.2.0)
  - ngx-ui-switch (^10.0.2)
- Other used modul BackEnd Side:
  - EntityFrameworkCore (v5.0.1)
  - MediatR (v9.0.0)
  - NLog (v4.9.3)
  - Swagger (v5.6.3)

### BackEnd Application solution structure:

- **Application.Web**:
  - This is the Web API Layer.
  - Includes IoC DI Registers, with separate configuration files.
  - Includes each extension for Web API (for example: Middlewares, Hosts, etc).
  - Includes Middleware for Global Error Handling.
  - Includes configuration settings for the Swagger.
  - Includes configuration settings for NLog.
- **Application.DataAccessLayer**:
  - Includes the DataBase Contexts _(Write and Read Contexts)_.
  - Includes every DataBase Entities.
  - Includes Extensions for DataBase Context _(you can see more information about this in: RecipeBookDbContextExtension.InitDatabase method)_.
  - Includes generated Database Migrations.
- **Application.Core**:
  - This project includes all elements that can be used by any point in the application.
  - This project does not include any business logic.
  - Includes the general application configuration keys and models.
  - Includes the general global error handling constants, models, enums and exceptions.
  - Includes extensions _(for example: enum extension)_.
  - Includes Command and Query interfaces for MediatR.
  - Includes the general role types (you can see more information about this in RoleType.cs).
  - includes the service that manages the signed in user.
  - Includes static datasets _(for example: content types)_.
- **Application.BusinessLogicLayer**:
  - This project includes the Business Logic.
  - The business logic can be divided into modules.
  - The module folders contain the following: Commands- Querys with Handlers, Dtos, Services with Interfaces and Request- Response Models for Web API endpoints.
  - Includes the Command and Query abstractions for MediatR.

### FrontEnd Application solution structure:

- **./src/app/core**:
  - This folder includes all elements that can be used by any point in the application.
  - The central services, interceptors and third party tools are registered here. (for exapmle: inetrceptor for global error handling or ToastrModule, etc.).
  - Includes the general application cache storage service.
  - Includes the locale storage management service.
  - Includes the authentication and authorization services.
  - Includes the general global error handling constants, models, enums and interceptors.
  - Includes the third party tools constants.
  - Includes the data models for routing.
  - Includes the core module.
- **./src/app/modules**:
  - Include all interface used to display business logic.
- **./src/app/shared**:
  - Includes the shared elements that are used in each module or globally in the application (for example: thousand separator pipe, or sidebar).
  - Includes every directives, that the application uses.
  - Includes every pipes, that the application uses.
  - Includes every font-awesome icons that the application uses.
  - Includes the sidebar container and components furthermore services.
  - Includes the header container and components furthermore services.
  - Includes the footer container.
  - Includes the loading spinner container and services.
  - Includes the ribbon toastr container, animations and services.
  - Includes the shared module.
- **./src/app**:
  - Includes the app routing module.
    - All modules are registered here using the lazy loading method.
  - Includes the app component html file.
    - All shared components and router-outlet are embedded here.
  - Includes the app component styles.
  - Includes the app component typescript file.
  - Includes the app module.
    - The shared and core modules are registered here.

### Installation/ Configuration:

1. **[BackEnd]** Restore necessary Packages on the selected project, run the following command in **PM Console**

   ```
   Update-Package -reinstall
   ```

2. **[FrontEnd]** If you do not already have the Angular CLI installed on your computer, so run the following command in CMD

   ```
   npm install -g @angular/cli
   ```

3. **[FrontEnd]** Restore necessary node_modules, so run the following command in GIT Bash Console in the application Angular-RecipeBook-FrontEnd root directory

   ```
   npm install --force
   ```

4. **[FrontEnd]** Start the application client side, so run the following command in GIT Bash Console in the application Angular-RecipeBook-FrontEnd root directory

   ```
   ng serve
   ```
   
5. **[BackEnd]** And launch the application BackEnd side!

6. After launching the app, you can access the app at the following URL

   ```
   http://localhost:4200/
   ```

### About the application:

This application demonstrates how to build a simple CRUD operations with an **Angular 10 Client Application** and a .**NET 5 Backend Application**. The application was started with a **.NET Core 3.1 Backend**, however, after the **.NET 5** release, it was easily and simply migrated, so the final version was already made in **.NET 5**.

The application implements the following business logics:

- You can sign in with a test user.
- You can manage a recipe book.
  - You can add, edit and delete any number of recipes.
- The saved recipes are loaded after sign in and the list is updated after each change.
- You can add the ingredients in the recipe to a shopping list.
- You can manually add and remove items to the shopping list, save or even simply empty it.

To display the application, a simple dashboard admin interface was created using a 3rd party tool, in addition, the application also sends notifications to the user in case of successful operations or to display errors.

You can find the login details of the application in the data migration files.

The structure of application has become a bit complicated, however I hope you will like it! :)

#### The application shows the following:

- BackEnd:

  - How to build an application using **CQRS** and **Mediator Pattern** and how to use it.
  - How to use **IoC Container** in **ASP.NET Core**.
  - How to separate **IoC Container Configurations** in **ASP.NET Core**.
  - How to use **Entity Framework Core** and how to separate **Entity Configurations** in **Entities**.
  - How to create **Extensions** to the **DataBase Context**.
  - How to create **Custom Database Seeds**, that run when the application start.
  - How to create a **Write**- and **Readonly Database Context** that corresponding to the **CQRS Pattern** and how to implement this.
  - How to use the **MediatR Nuget Package** to use the **Mediator Pattern**.
  - How to build and use **Command** and **Query** Handlers.
  - How to use **User Manager** and **Role Manager** provided by **ASP.NET**.
  - How to read **Configuration Settings** from **appsettings.json** into different configuration models.
  - How to easily manage the **Handled** and **Unhandled exceptions** in an **ASP.NET Application** using a **Middleware**.
  - How to create and use a **Versioned Web API**.
  - How to build a **Web API** using **Request**- and **Response Models**.
  - How to use the **Swashbuckle.AspNetCore Nuget Package** to use the **Swagger Tools** _(the source code used was marked in an XML comment)_.
  - How to use the **NLog.Web.AspNetCore Nuget Package** to use the **NLog** to **Log** into a **File** and **DataBase**.
  - How to **Sign In** to a user on a **Cookie Basis**.
  - How to **Authorize** the user using **Cookies**.
  - How to create and use a service that manages the data of a logged in user.

- FrontEnd
  - How to build a structured application in Angular 2+.
  - How to use the **Data Binding**.
  - How to use the **Routing**.
  - How to use the **Directives**.
  - How to use the **Pipes**.
  - How to use the different **RxJs Operators**.
  - How to create and use the **Observables**.
  - How to use the **Observables** for **Data Binding**.
  - How to create and use **Getters** for **Observables**.
  - How to use the **Dependency Injection**.
  - How to build **Custom Services** and register them for **Dependency Injection**.
  - How to use **Subjects** or **Behavior Subjects** to communicate between components.
  - How to **Subscribe** to **Subjects**, **Observables** and how to **Unsubscribe** from them to avoid **Memory Leaks**.
  - How the **Client Application** communicates with **BackEnd Application** via **HttpClient**.
  - How to create and use **Validators** and **Async Validators**.
  - How to create **Http Interceptors**.
  - How to create and use **Guards**.
  - How to define **Core Module**, **Shared Module** and how to integrate these into the **App Module**.
  - How to build a **Module**, broken down into **Container** and **Smaller Components**.
  - How to use **Lazy Loading** to **Load Modules**.
  - How to **Handle Errors** that return from the **BackEnd Side** using **Interceptors**.
  - How to create a **Client-Side Cache Service** that uses the **Local-Storage** as **Cache**.
  - How to create a **Guard** that reads from the cache first, but if it fails or expires, call the backend side for data and then update the cache.
  - How to **Sign In** with a user.
  - How to **Authorize** a user on a **Cookie Basis**.
  - How to build a **Custom Dashboard Admin** interface using **ng-sidebar Component**.
  - How to build a **Custom Header** in which the page and subpage titles always change.
  - How to build **Custom Notifications** using **ngx-toastr Component**.
  - How to build a **Custom Loading Spinner** using **ng-loading-spinner Component**.
  - How to use **@fortawesome/angular-fontawesome Component** as a separate module to display each fontawesome icon.
  - How to use **ngx-avatar Component** to generate an a **Custom Avatar**.
  - How to use **ngx-ui-switch Component**.
  - How to use **ngx-currency Component**.
  - How to build a **404 Page**.
  - How to build **Unique Styles** and refer to them.
