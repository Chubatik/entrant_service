export function getYearsObj(years): any[] {
  const ys = [];
  for (let i = 0; i < years.length; i++) {
    const y = { id : i, value : years[i].years };
    ys.push(y);
  }
  return ys;
}

export function getYearsArr(years): any[] {
  const ys = [];
  // tslint:disable-next-line:prefer-for-of
  for (let i = 0; i < years.length; i++) {
    const y = years[i].years;
    ys.push(y);
  }
  return ys;
}
export function getSpecsArr(specs): any[] {
  const spc = [];
  // tslint:disable-next-line:prefer-for-of
  for (let i = 0; i < specs.length; i++) {
    const y = specs[i].specialty_name;
    spc.push(y);
  }
  return spc;
}
export function addNonPrivilegeCase(privileges): any[] {
  const nonPrivilegeCase = {
    privilege_id: 0,
    privilege_name: 'Немає пільг'
  };
  privileges.push(nonPrivilegeCase);
  return privileges;
}

export function setNullValue(obj): void {
  for (const i in obj) {
    if (obj.hasOwnProperty(i) && obj[i] === undefined){
      obj[i] = null;
    }
  }
}

export function sortObj(obj): object {
  return Object.keys(obj).sort().reduce((result, key) => {
    result[key] = obj[key];
    return result;
  }, {});
}

export function getAccess(): boolean {
  return JSON.parse(localStorage.getItem('access')).access;
}
