var Location = function(obj, obj2){
    alert("You created a loaded object.");
    this.latitude = obj.coords.latitude;
    this.longitude = obj.coords.longitude;
    this.fullAddress = obj2.results[0].formatted_address;
    this.streetNum = obj2.results[0].address_components[0].long_name;
    this.street = obj2.results[0].address_components[1].long_name;
    this.city = obj2.results[0].address_components[2].long_name;
    this.province_state = obj2.results[0].address_components[3].long_name;
    this.country = obj2.results[0].address_components[4].long_name;
    this.postal_zip_code = obj2.results[0],address_components[5].long_name;
};

var Location = function(){
    alert("You created a empty object.");
};