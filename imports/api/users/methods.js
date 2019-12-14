import { ValidatedMethod } from "meteor/mdg:validated-method";
import SimpleSchema from "simpl-schema";

const googleUser = new ValidatedMethod({name:'users.googleUser',validate:new SimpleSchema().validator()})