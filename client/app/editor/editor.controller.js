'use strict';

angular.module('workspaceApp')
  .controller('EditorCtrl', function ($scope, Auth, $location, $http, $sce) {
    //This is the authentication of the view.
    $scope.isLoggedIn = Auth.isLoggedIn();
    $scope.isAdmin = Auth.isAdmin();
    $scope.getCurrentUser = Auth.getCurrentUser();
    if($scope.isLoggedIn === false){
      $location.path('/');
    }
    $scope.picture = false;
    //This is all of the post relevant items for the view.
    $scope.editPost = {
      name: '',
      author: 'Glenn Nausley',
      info: '',
      active: false,
      body: '',
      markdown: '',
      thumbPic: '',
      postDate: new Date(),
      titleStyleing: '',
      titleColor: ''
    };
    $scope.preview = false;
    $scope.postTags = '';
    
    
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
        var title = "<h2 class='postTitle hidden-xs' style=\"color:"+$scope.editPost.titleColor+"\">"+$scope.editPost['name']+ "</h2><h4 class='smPostTitle visible-xs' style=\"color:"+$scope.titleColor+"\">"+$scope.editPost['name']+ "</h4>";
        if($scope.picture){
          title = "<div class='mdl-card__media' style=\"background-image: url('"+$scope.editPost['thumbPic']+"');"+$scope.editPost.titleStyleing+"\">"+title+"</div>";
        } else{
          title = "<div class='mdl-card__title' style=\"background-image: url('"+$scope.editPost['thumbPic']+"');"+$scope.editPost.titleStyleing+"\">"+title+"</div>";
        }
        content =  title + '\n' + "<div class='mdl-card__subtitle-text date'>" + $scope.editPost.formatDate + "<a href='http://twitter.com/intent/tweet?status="+$scope.editPost['name'] + " by "+$scope.editPost.author+"'><span class='fa-stack smFooter'><i class='fa fa-twitter fa-stack-1x'></i></span></a>"+"<a ><span class='fa-stack smFooter'><i class='fa fa-facebook fa-stack-1x'></i></span></a>"+'</div>\n' + "<div class='mdl-card__supporting-text'>"+ converter.makeHtml(content)+"</div>";
        var foot ="\n \n" + "<div class='postFooter'> Written by: "+ $scope.editPost.author + "";
        if(modTags){
          foot = foot + ""+" || Tagged under: " + modTags + "";
        }
        foot = foot //+ "<a href='http://twitter.com/intent/tweet?status="+$scope.editPost['name'] + " by "+$scope.editPost.author+"'><span class='fa-stack smFooter'><i class='fa fa-twitter fa-stack-1x'></i></span></a>"+"<a ><span class='fa-stack smFooter'><i class='fa fa-facebook fa-stack-1x'></i></span></a>";
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
      var urlID = this.dateFor +'/'+ this.editPost.name.split([' ']).join(['-']);
      $scope.editPost['category'] = newTags;
      $scope.editPost['urlID'] = urlID;
      $http.post('/api/posts', $scope.editPost);
      $location.path('/fileManage');
    };
  });
