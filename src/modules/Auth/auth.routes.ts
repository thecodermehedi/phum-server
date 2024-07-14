import validateRequest from "../../middlewares/validateRequest";
import createRouter from "../../utils/createRouter";
import { AuthValidation } from "./auth.validator";


const router = createRouter();

router.post('/login', validateRequest(AuthValidation.loginUserValidationSchema),)
