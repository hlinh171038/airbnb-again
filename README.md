18. favorite function (when you click to heart icon)
    - i have heart icon and style in(Favorite button)
        - call hooks and pass listing id and currentuser
    - hook to click on it call api endpoint
        - interface recive (listingId , currrentUser)
        - function useFavorite
            - take favoriteIds in currenUser
                -use Memo 
                - const list = currentUser?.favorateIds || []
                return list.inlcudes(listingId);
            - toggle Favorite when click
                - check current user is exist --> not -->require signin
                - if(hasFavorite == true) --> axios.delete
                - else --> axios.post
    - Api end point
        - recive listingId like params
        - check currentUser is exist --> not return NextResponse.error
        - take params (listingId)
        - check listingId is exsit or not === 'string --> throw new error ('Invalid id')
            - let favoriteIds = [...(currentUser.favoriteIds || [])];
                favoriteIds.push(listingId);
        - update
        - return NextResponse.json
    - delete do the same + filter current id 

    explain: 
        1. button --> click call hooks( toogleFavorite to toggle and hasFavorite to check if have liatingId in currentUser.favoritedId[])
        2. api/route.ts to update and delete on mongodb