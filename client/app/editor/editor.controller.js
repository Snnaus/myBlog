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
      var newTags = this.postTags.split([',']), modTags = null;
      newTags = newTags.map(function(tag){return tag.trim()})
      console.log(newTags);
      if(newTags.length > 0 && newTags[0] !== ''){
        modTags = newTags.map(function(data){
          return "<a href='/cat/"+data+"'>"+data+"</a>";
        }).reduce(function(prev, curr){
          return prev + ', '+ curr;
        });
      }
      if(content){
        $scope.dateFor = date.getMonth()+ 1 +'/'+ date.getDate() +'/'+date.getFullYear();
        content = "<h2 class='postTitle'>"+$scope.title+ "</h2>" + '\n' + '#####' + $scope.dateFor + '\n' + content;
        content = content + "\n \n" + "<sup><sub> Written by: "+ $scope.author + "</sub></sup>";
        if(modTags){
          content = content + "<sup><sub>"+" || Tagged under: " + modTags + "</sub></sup>";
        }
        content = content + "<a href='http://twitter.com/intent/tweet?status="+$scope.title + " by "+$scope.author+"'><span class='fa-stack smFooter'><i class='fa fa-twitter fa-stack-1x'></i></span></a>"+"<a ><span class='fa-stack smFooter'><i class='fa fa-facebook fa-stack-1x'></i></span></a>";
        //href='http://www.facebook.com/sharer/sharer.php?u=[URL]&title='"+$scope.title + " by "+$scope.author+"'
        $scope.result = converter.makeHtml(content);
        //$scope.result = content;
        $scope.preview = true;
      }
    };
    
    $scope.goBack = function(){
      $scope.preview = false;
    };
    
    $scope.savePost = function(){
      var newTags = this.postTags.split([',']).map(function(tag){return tag.trim()});
      var urlID = this.dateFor +'/'+ this.title.split([' ']).join(['-']);
      console.log(urlID);
      var newPost = {
        name: this.title,
        author: this.author,
        info: '',
        active: false,
        category: newTags,
        body: this.result,
        markdown: this.typed,
        thumbPic: '',
        postDate: this.date,
        urlID: urlID
      };
      $http.post('/api/posts', newPost);
      $location.path('/');
    };
  });
