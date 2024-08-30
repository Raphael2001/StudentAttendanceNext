import { onChangeValue } from "utils/types/form";

function useValidate() {
  const Validations = {
    no_validation: {
      valid: () => true,
      msg: "",
    },
    not_empty: {
      valid: (val: onChangeValue) => val !== "" && val !== undefined,
      msg: "שדה חובה",
    },
    email: {
      valid: (val: string) =>
        /^([\w!#$%&'*+-/=?^`{|}~]+\.)*[\w!#$%&'*+-/=?^`{|}~]+@((((([a-zA-Z0-9]{1}[a-zA-Z0-9-]{0,62}[a-zA-Z0-9]{1})|\[a-zA-Z\])\.)+[a-zA-Z]{2,6})|(\\d{1,3}\.){3}\\d{1,3}(:\\d{1,5})?)$/.test(
          val
        ),
      msg: 'כתובת דוא"ל שגויה',
    },
    cell: {
      valid: (val: string) =>
        /^(?:(0(?:50|51|52|53|54|55|58|72|73|74|76|77|78)[-]?[0-9]{7}))$/.test(
          val
        ),
      msg: "מספר סלולרי שגוי",
    },
    phone: {
      valid: (val: string) =>
        /^(?:(0(?:2|3|4|8|9|7|50|51|52|53|54|55|56|58|59|72|73|74|76|77|78)[-]?[0-9]{7}))$/.test(
          val
        ),
      msg: "מספר טלפון שגוי",
    },
    full_name: {
      valid: (val: string) =>
        /^([\w\u0590-\u05FF]{2,})+\s+([\w\u0590-\u05FF\s]{2,})+$/.test(val),
      msg: "יש למלא שם פרטי ושם משפחה",
    },
    not_empty_array: {
      valid: (val: Array<string>) =>
        val && Array.isArray(val) && val.length > 0,
      msg: "שדה חובה",
    },
    price: {
      valid: (val: string) => /^\d+(\.\d{2})?$/.test(val),
      msg: "מחיר אינו תקין",
    },
    alphanumeric: {
      valid: (val: string, minLength = 2) =>
        new RegExp(`^[A-Za-z0-9_-]{${minLength},}$`).test(val),
      msg: (minLength = 2) =>
        `אותיות באנגלית ומספרים בלבד (מינומום ${minLength})`,
    },
    password: {
      valid: (val: string) =>
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{6,}$/.test(val),
      msg: "אותיות באנגלית, תווים מיוחדים ומספרים בלבד (מינומום 6)",
    },
    arrayMinOptions: {
      valid: (val: Array<string>, min = 1) =>
        Array.isArray(val) && val.length >= min,

      msg: (min = 1) => {
        if (min === 1) {
          return "חובה לבחור אופציה אחת לפחות";
        } else if (min > 1) {
          return `חובה לבחור אופציות ${min} לפחות`;
        }
      },
    },
  };

  function validate(value: onChangeValue, rules: Array<any>) {
    for (const rule of rules) {
      if (Array.isArray(rule)) {
        const [ruleName, ...params] = rule;
        if (Object.hasOwn(Validations, ruleName)) {
          const validation = Validations[ruleName];
          const valid =
            typeof validation.valid === "function"
              ? validation.valid(value, ...params)
              : false;
          if (!valid) {
            const msg =
              typeof validation.msg === "function"
                ? validation.msg(...params)
                : validation.msg;
            return { valid: false, msg };
          }
        }
      } else if (Object.hasOwn(Validations, rule)) {
        const validation = Validations[rule];
        const valid =
          typeof validation.valid === "function"
            ? validation.valid(value)
            : false;
        if (!valid) {
          const msg =
            typeof validation.msg === "function"
              ? validation.msg()
              : validation.msg;
          return { valid: false, msg };
        }
      }
    }
    return { valid: true, msg: "" };
  }

  return validate;
}

export default useValidate;
