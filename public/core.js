angular.module('nodeBlog', [])
.controller('mainController', [ '$scope', '$http', function($scope, $http) {
    $scope.userForm = {};
    $scope.user = {};
    $scope.loggedin = false;
    $scope.isPostFormVisible = false;
    $scope.isPostViewVisible = false;
    $scope.isPostListVisible = true;
    $scope.isMailFormVisible = false;

    $scope.postForm = {};
    $scope.postList = {};

    $scope.mailForm = {};
    
    $http
    .get("/api/user")
    .then(function(response) {
        $scope.user = response.data;
        if ($scope.user.username) $scope.loggedin = true;
    }, function(response) {
        console.log("Error userinfo:" + response.data);
    });

    $http
    .get("/api/posts")
    .then(function(response) {
        $scope.postList = response.data;
    }, function(response) {
        console.log("Error postList(): " + response.data);
    });

    $scope.createUser = function() {
        $http
        .post("/api/user/create", $scope.userForm)
        .then( function(response) {
            console.log("User created: " + response);
            $scope.userForm = {};
            $scope.user = response.data;
        }, function(response) {
            console.log("Error creating user: " + response);
        });
    };

    $scope.loginUser = function() {
        $http
        .post("/api/user/login", $scope.userForm)
        .then( function(response) {
            console.log("Login: " + response.data);
            $scope.user = response.data;
            $scope.userForm = {};
            $scope.loggedin = true;
        }, function(response) {
            console.log("Error login user: " + response.data);
        });
    };

    $scope.logoutUser = function() {
        $http
        .post("/api/user/logout")
        .then( function(response) {
            console.log("Logout");
            $scope.user = {};
            $scope.loggedin = false;
        }, function(response) {
            console.log("Error logout user");
        });
    };

    $scope.createPost = function() {
        $http
        .post("/api/post", $scope.postForm)
        .then(function(response) {
            console.log("Post created: " + response.data._id);
            $scope.postForm = response.data;
            $scope.isPostFormVisible = false;
            $scope.isPostListVisible = false;
            $scope.isPostViewVisible = true;
            }, function(response) {
            console.log("Error creating post: " + response);
        });
    };

    $scope.updatePost = function(id) {
        $http
        .put("/api/post/" + id, $scope.postForm)
        .then(function(response) {
            $scope.isPostFormVisible = false;
            $scope.isPostListVisible = false;
            $scope.isPostViewVisible = true;
        }, function(response) {
            console.log("Error post update" + response.data);
        });
    };

    $scope.viewPost = function(id) {
        $http
        .get("/api/post/" + id)
        .then(function(response) {
            $scope.postForm = response.data;
            $scope.isPostFormVisible = false;
            $scope.isPostListVisible = false;
            $scope.isPostViewVisible = true;
        }, function(response) {
            console.log("Error reading post: " + response);
        });
    };

    $scope.deletePost = function(id) {
        $http
        .delete("/api/post/" + id)
        .then(function(response) {
            $scope.postList = response.data;
            $scope.isPostFormVisible = false;
            $scope.isPostListVisible = true;
            $scope.isPostViewVisible = false;
        }, function(response) {
            console.log("Error deleting post: " + response);
        });
    };

    $scope.sendEmail = function() {
        $http
        .post("/api/mail", $scope.mailForm)
        .then(function(response) {
            $scope.isPostFormVisible = false;
            $scope.isPostListVisible = true;
            $scope.isPostViewVisible = false;
            $scope.isMailFormVisible = false;
        }, function(response) {
            console.log("Error sending emial" + response.data);
        });
    }

    $scope.addPost = function() {
        $scope.postForm = {};
        $scope.isPostFormVisible = true;
        $scope.isPostListVisible = false;
        $scope.isPostViewVisible = false;
    };

    $scope.editPost = function() {
        $scope.isPostFormVisible = true;
        $scope.isPostListVisible = false;
        $scope.isPostViewVisible = false;
    };

    $scope.viewPostList = function() {
        $scope.isPostFormVisible = false;
        $scope.isPostListVisible = true;
        $scope.isPostViewVisible = false;
        $scope.isMailFormVisible = false;
    };

    $scope.contactForm = function() {
        $scope.mailForm = {};
        $scope.isPostFormVisible = false;
        $scope.isPostListVisible = false;
        $scope.isPostViewVisible = false;
        $scope.isMailFormVisible = true;
    };
}]);
