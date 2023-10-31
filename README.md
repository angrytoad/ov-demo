### Running The App
- Simply `npm install`
- Copy the `.env.example` file over and re-name to `.env` and add your API key
- `npm run dev`

### Additional Notes

Mobx is being used as a state manager as its very easy to slot into an app 
and just works really well without needing to add a whole bunch of boilerplate.

I just used the national carbon intensity as I know there is a way to pass a 
postcode into the regional endpoint but the postcode is tied up in the address
field as a single string and to be honest didn't want to spend the time 
fiddling with regex to try and extract it, if the postcode was a separate
field from the openvolt API I would have used that instead for more accuracy.
It would be worth considering making that address field an object and having 
each line a separate value in the future as having access to the postcode 
without needing to extract it would have been very useful in this case.

I chose not to use a styling framework as its a bit overkill for something 
like this. Also i'm a big believer in understanding the fundamentals and 
having a good understanding of CSS without needing to spam classes onto 
everything.

I've spent about 5-6 or so hours working on this.

Technically this app will pull back all customers and meters for each customer
depending on the API key you use. The times are hardcoded to january only, 
but it wouldn't be too difficult to go and add the ability to specify a time 
range for the data.

National grid API would only let me select maximum 14 days for their carbon 
intensity API so that's why its broken into three separate requests.

I appreciate this probably didn't need to be done entirely on the frontend 
but given the time i'd alloted to spend on this it felt wasteful to create a 
separate backend service to proxy the requests for something like this.

Everything should be typed properly, i've had to guess at some of the 
typings as im sure an enum would be more appropriate than a string but I 
just didn't know what the other values would be, for example the status 
property on the meter object.

Components are organised roughly following atomic design principals, this is 
the most superior way to organism components in my (very) biased opinion.

All the big errors are handled, but there could have been a lot more error 
handling on a per-request basis.

Likewise with tests, although in the past few years i've had a bit of an 
epiphany and am now a huge advocate for reducing/eliminating tests in most 
frontend code.
