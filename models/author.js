const mongoose = require("mongoose");
const { DateTime } = require("luxon");
const moment = require("moment");

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    first_name: { type: String, required: true, maxLength: 100 },
    family_name: { type: String, required: true, maxLength: 100 },
    date_of_birth: { type: Date },
    date_of_death: { type: Date },
});

AuthorSchema.virtual("name").get(function(){
    let fullname = "";
    if(this.first_name && this.family_name){
        fullname = `${this.family_name}, ${this.first_name}`
    }

    return fullname;
})

AuthorSchema.virtual("url").get(function(){
    return `/catalog/author/${this._id}`;
});

AuthorSchema.virtual("life_span").get(function() {
    if (this.date_of_birth) {
        if (this.date_of_death) {
            return `(${DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED)} - ${DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED)})`;
        } else {
            return `(   ${DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED)} - Present)`;
        }
    } else {
        return "-";
    }
});

AuthorSchema.virtual("dob").get(function(){
    return moment(this.date_of_birth).format('YYYY-MM-DD');
})

AuthorSchema.virtual("dod").get(function(){
    return this.date_of_death ? moment(this.date_of_death).format('YYYY-MM-DD') : ""
})


module.exports = mongoose.model("Author", AuthorSchema);