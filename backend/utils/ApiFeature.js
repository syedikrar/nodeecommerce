class ApiFeature{ //class used for searching products in application
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    search(){ //function that search product on the basis of keyword
        const keyword = this.queryStr.keyword //the string we pass for search
      ? {
          name: {  //this is the column that we want to search
            $regex: this.queryStr.keyword, // mongodb operator (what to search)
            $options: "i", //mongodb operator used for case sensitive otherwise it will search uppercase name
          },
        }
      : {};
        console.log(keyword);
        this.query = this.query.find({...keyword}); 

        return this;
    }
    
    filter() {
        const queryCopy = { ...this.queryStr };
        console.log(queryCopy);
        // remove some fields for category
        const removeFields = ["keyword", "page", "limit"];
        
        removeFields.forEach((key) => delete queryCopy[key]);
        
         // Filter For Price and Rating

        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
        console.log(queryStr);
        this.query = this.query.find(JSON.parse(queryStr));

        return this;
    }

    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = currentPage * (currentPage - 1);

        this.query = this.query.limit(currentPage).skip(skip);
        return this;
    }

}

module.exports = ApiFeature