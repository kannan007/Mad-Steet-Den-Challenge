var app=angular.module('Mad', []);
app.controller('products',function($scope,$http)
{
	$scope.categories=[];
	$scope.productdetails=[];
	$scope.showmenu=false;
	$scope.catselected={};
	$scope.selectedsort="";
	$http.get("https://test-prod-api.herokuapp.com/products").then(function(response)
	{
		$("nav").fadeIn();
		$scope.count=0;
		$scope.showmenu=true;
		for(var i=0;i<9;i++)
		{
			$scope.productdetails.push(response.data.products[i]);
		}
		$scope.size=response.data.products.length;
		for(var j=0;j<$scope.size;j++)
		{
			if($scope.categories.indexOf(response.data.products[j].cat) ==-1)
			{
				$scope.categories.push(response.data.products[j].cat);
				$scope.count+=1;
			}
		}

	},function(response)
	{
		$scope.errormessage = response.status + " "  + response.statusText ;
	});
	$scope.len=18;
	$scope.iterate=9;
	$scope.getagain=function()
	{
		$http.get("https://test-prod-api.herokuapp.com/products").then(function(response)
	{
		$scope.showsecondmenu=true;
		for(var i=$scope.iterate;i<$scope.len;i++)
		{
			$scope.productdetails.push(response.data.products[i]);
		}
		$scope.size=$scope.productdetails.length;
		$scope.len=i+9;
		$scope.iterate=i;
	},function(response)
	{
		$scope.errormessage = response.status + " "  + response.statusText ;
	});	
	};
	$(window).scroll(function()
	{
   		if($(window).scrollTop() + $(window).height() >= $(document).height()) 
   		{
   			console.log($scope.iterate);
   			if($scope.iterate>=1000)
   			{
   				console.log("All done");
   				alert("Fully displayed");
   			}
   			else
   			{
   				$scope.showsecondmenu=false;
       			$scope.getagain();	
   			}
   			
   		}
	});
	
	$scope.filtercategories=function()
	{
		return function(ans)
		{
			if(($scope.catselected['jeans'] === false || $scope.catselected['jeans'] === undefined) && 
				($scope.catselected['sarees'] === false || $scope.catselected['sarees'] === undefined) && 
				($scope.catselected['pants'] === false || $scope.catselected['pants'] === undefined) && 
				($scope.catselected['tops'] === false || $scope.catselected['tops']===undefined) && 
				($scope.catselected['tshirts'] === false || $scope.catselected['tshirts'] === undefined))
			{
				//console.log("Firstinside");
				//console.log($scope.catselected[$scope.categories[0]]);
				return true;
			}
			else if($scope.catselected[ans.cat] === true)
			{
				$scope.firstime=0;
				//console.log(ans.cat);
				return true;
			}
		}
	}
});	