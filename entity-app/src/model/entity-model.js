import FetchEntities from './../utils/service-broker';
export default class EntityModel {
  constructor() {
    this.loaded = false;
    this.subscibers = [];
    this.entityMap = {};
    FetchEntities().then((results) => {
      this.entityMap = this.prepareMap(results);
      this.eNoChild = this.getENoChild();
      this.eOneLevelChild = this.getEOneLevelChild();
      this.nestedEntities = this.getNestedEntities();
      console.log(this.nestedEntities);
      this.subscibers.forEach((callBack) => callBack());
    });
  }

  subscribe(callBack) {
    if (callBack && typeof callBack === 'function') {
      this.subscibers.push(callBack);
    }
  }

  prepareMap(results) {
    const entityMap = {};
    results.forEach((result) => {
      //1. Check if its key is already present
      if (!entityMap[result.sys_id]) {
        entityMap[result.sys_id] = {};
      } else if (entityMap[result.sys_id].sys_id) {
        //2. return if the key is already present
        //sys_id should be unique
        return;
      }
      entityMap[result.sys_id] = { ...entityMap[result.sys_id], ...result };

      //3. Check for the parent and embed inside it
      if (result.parent !== '') {
        //4.check if parent exists in the entityMap
        if (!entityMap[result.parent.value]) {
          entityMap[result.parent.value] = {};
        }
        //5.check if the children array is present
        if (!entityMap[result.parent.value].children) {
          entityMap[result.parent.value].children = [];
        }
        entityMap[result.parent.value].children.push(result.sys_id);
      }
    });
    return entityMap;
  }

  getENoChild() {
    const items = [];
    for (const key in this.entityMap) {
      const entity = this.entityMap[key];
      if (
        entity.parent === '' &&
        (entity.children === undefined || entity.children.length === 0)
      ) {
        items.push(entity);
      }
    }

    return items;
  }

  getEOneLevelChild() {
    const items = [];
    Object.keys(this.entityMap)
      .filter((key) => this.entityMap[key].children)
      .forEach((key) => {
        const entity = this.entityMap[key];
        const children = [];
        let newEntity = {};
        entity.children.forEach((child) => {
          const childEntity = this.entityMap[child];
          if (!childEntity.children) {
            children.push(childEntity);
          }
        });
        if (children.length > 0) {
          newEntity = { ...entity };
          newEntity.children = children;
          items.push(newEntity);
        }
      });
    return items;
  }

  getChildren(obj, key, depth) {
    const entity = this.entityMap[key];
    if (
      (depth === 1 && !entity.children) ||
      (depth === 1 && entity.children.length === 0)
    ) {
      return null;
    }
    if (entity.children && entity.children.length > 0) {
      const children = [];
      entity.children.forEach((child) => {
        const childObj = this.getChildren({}, child, depth + 1);
        if (childObj) {
          children.push(childObj);
        }
      });
      if (children.length > 0) {
        obj = { ...entity };
        obj.children = children;
      }
      return obj;
    } else if (depth !== 0) {
      obj = { ...entity };
      return obj;
    }
    return obj;
  }
  getNestedEntities() {
    const items = [];
    for (const key in this.entityMap) {
      const nestedTree = this.getChildren({}, key, 0);
      if (Object.keys(nestedTree).length > 0) {
        items.push(nestedTree);
      }
    }
    return items;
  }
}
