module.exports = function (mongoose) {
//    var FieldSchema = require ("./field.schema.js") (mongoose);

/*    var FieldSchema = mongoose.Schema ({
        label : String,
        fieldType : {
            type : String,
            enum : ["TEXT", "TEXTAREA", "RADIO", "CHECKBOX", "EMAIL", "SELECT", "DATE"]
        },
        options : [
            {
                label : String,
                value : String
            }
        ],
        placeholder : String
    });  */

    var FormSchema = mongoose.Schema ({
        title : String,
        userId : String,
        fields : String
    }, {collection : "cs5610.assignment.form"});
    return FormSchema;
};