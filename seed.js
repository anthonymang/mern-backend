const { Book } = require('./models')


const books = 
[
    {
        title: 'Book 1',
        author: 'Author 1',
        pages: 199,
        genre: 'Business',
        price: 20,
        ISBN: 7568243
    },
    {
        title: 'Book 2',
        author: 'Author 2',
        pages: 250,
        genre: 'Crime',
        price: 15,
        ISBN: 734245454325
    },
    {
        title: 'Book 3',
        author: 'Author 3',
        pages: 398,
        genre: 'Young Adult',
        price: 20,
        ISBN: 63423412578
    },
    {
        title: 'Book 4',
        author: 'Author 4',
        pages: 317,
        genre: 'Drama',
        price: 25,
        ISBN: 23472137420194
    },

]

Book.create(books, (err, results)=>{
    if (err) console.log(err)
    console.log(results)
})