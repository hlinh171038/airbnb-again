17.Fetching listing with server component (Listing card component, server direct action)
    1. wrap layout with style(padding: xy)
    2. take listing data (prisma)
        - export async function ( use prisma.listing.findmany ) and orderBy:{ createAt: 'desc'}
    2.EmptyState.tsx 
        -page.tsx --> check ( listing.length === 0 or not)
        - if(listing.lenght === 0) --> call EmprtState.tsx and pass showReset props
        -emptyState.tsx --> if have props showReset --> show button 'remove all filter' and router.push'/'

    3. if(listing.length !== 0)
        - take listing --> map ( ListingCard.tsx) pass props data
    4. ListingCard.tsx
     - show image --> data.imageSrc // style (group --> group-hover:scale-110)
        - HeartButton --> show icon heart
     - show location --> location (getByValue) --> pass date.locationValue
     - show category and date reservation --> check !reservation --> return null else --> return startDate - endDate
     - show price --> check reservation --> return totalPrice else return data.price
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     explain: 
     - want to fexching data to home(page.tsx)
     - check if(listing === 0) --> retutrn EmptyState
     - else --> map listing --> pass props(listingId, currentUser)
     - ListingCard --> each items