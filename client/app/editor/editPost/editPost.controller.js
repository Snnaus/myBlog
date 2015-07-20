'use strict';

angular.module('workspaceApp')
  .controller('EditPostCtrl', function ($scope, $routeParams, Auth, $http, $location, $sce) {
    
     //This is the authentication of the view.
    $scope.isLoggedIn = Auth.isLoggedIn();
    $scope.isAdmin = Auth.isAdmin();
    $scope.getCurrentUser = Auth.getCurrentUser();
    if($scope.isLoggedIn === false){
      $location.path('/');
    }
    $scope.editPost = {};
    $http.get('/api/posts/'+$routeParams.id).success(function(post){
      $scope.editPost = post;
      $scope.postTags = post.category.join([',']);
      $scope.editPost.postDate = new Date(post.postDate);
      $scope.picture = post.thumbPic;
    });
    
   
    //This is all of the post relevant items for the view.
    $scope.preview = false;
    
    
    
    var converter = new showdown.Converter();
    
    $scope.convert = function(content, date){
      var newTags = this.postTags.split([',']), modTags = null;
      newTags = newTags.map(function(tag){return tag.trim()});
      if(newTags.length > 0 && newTags[0] !== ''){
        modTags = newTags.map(function(data){
          return "<a href='/cat/"+data+"'>"+data+"</a>";
        }).reduce(function(prev, curr){
          return prev + ', '+ curr;
        });
      }
      if(content){
        $scope.editPost.formatDate = date.getMonth()+ 1 +'/'+ date.getDate() +'/'+date.getFullYear();
        var title = "<h2 class='postTitle hidden-xs' style=\"color:"+$scope.titleColor+"\">"+$scope.editPost['name']+ "</h2><h4 class='smPostTitle visible-xs' style=\"color:"+$scope.titleColor+"\">"+$scope.editPost['name']+ "</h4>";
        if($scope.picture){
          title = "<div class='mdl-card__media' style=\"background-image: url('"+$scope.editPost['thumbPic']+"');\">"+title+"</div>";
        } else{
          title = "<div class='mdl-card__title'>"+title+"</div>";
        }
        content =  title + '\n' + "<div class='mdl-card__subtitle-text date'>" + $scope.editPost.formatDate + '</div>\n' + "<div class='mdl-card__supporting-text'>"+ converter.makeHtml(content)+"</div>";
        var foot ="\n \n" + "<div class='postFooter'> Written by: "+ $scope.editPost.author + "";
        if(modTags){
          foot = foot + ""+" || Tagged under: " + modTags + "";
        }
        foot = foot + "<a href='http://twitter.com/intent/tweet?status="+$scope.editPost['name'] + " by "+$scope.editPost.author+"'><span class='fa-stack smFooter'><i class='fa fa-twitter fa-stack-1x'></i></span></a>"+"<a ><span class='fa-stack smFooter'><i class='fa fa-facebook fa-stack-1x'></i></span></a>";
        //href='http://www.facebook.com/sharer/sharer.php?u=[URL]&title='"+$scope.title + " by "+$scope.author+"'
        foot = foot + "</div>";
        content = content + foot;
        $scope.editPost.body = converter.makeHtml(content);
        //$scope.result = content;
        $scope.preview = true;
      }
    };
    
    $scope.goBack = function(){
      $scope.preview = false;
    };
    
    $scope.savePost = function(){
      var newTags = this.postTags.split([',']).map(function(tag){return tag.trim()});
      var urlID = this.editPost.for +'/'+ this.editPost.name.split([' ']).join(['-']);
      console.log(this.editPost);
      $scope.editPost['category'] = newTags;
      $scope.editPost['urlID'] = urlID;
      $http.put('/api/posts/'+$routeParams.id, $scope.editPost);
      $location.path('/fileManage');
    };
  });
