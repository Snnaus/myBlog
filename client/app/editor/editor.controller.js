'use strict';

angular.module('workspaceApp')
  .controller('EditorCtrl', function ($scope, Auth, $location, $http) {
    //This is the authentication of the view.
    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn();
    $scope.isAdmin = Auth.isAdmin();
    $scope.getCurrentUser = Auth.getCurrentUser();
    
    //This is all of the post relevant items for the view.
    $scope.preview = false;
    $scope.typed = '';
    $scope.result = '';
    $scope.title = '';
    $scope.author = 'Glenn Nausley';
    $scope.date = new Date();
    $scope.postTags = '';
    /*if($scope.isLoggedIn === false){
      $location.path('/');
    }*/
    
    var converter = new showdown.Converter();
    
    $scope.convert = function(content, date){
      if(content){
        var dateFor = date.getMonth()+ 1 +'/'+ date.getDate() +'/'+date.getFullYear();
        content = "<h2 class='postTitle'>"+$scope.title+ "</h2>" + '\n' + '#####' + dateFor + '\n' + content;
        $scope.result = converter.makeHtml(content);
        $scope.preview = true;
      }
    };
    
    $scope.goBack = function(){
      $scope.preview = false;
    };
    
    $scope.savePost = function(){
      var newTags = this.postTags.split([',']);
      var newPost = {
        name: this.title,
        author: this.author,
        info: '',
        active: true,
        tags: newTags,
        body: this.result,
        markdown: this.typed,
        thumbPic: '',
        postDate: this.date
      };
      $http.post('/api/posts', newPost);
      $location.path('/');
    };
  });
