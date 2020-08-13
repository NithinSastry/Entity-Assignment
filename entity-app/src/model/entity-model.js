import FetchEntities from './../utils/service-broker';
export default class EntityModel {
  constructor() {
    this.entityMap = {};
    FetchEntities().then((results) => {
      this.entityMap = this.prepareMap(results);
      console.log(this.entityMap);
      console.log(this.getENoChild());
      console.log(this.getEOneLevelChild());
    });
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
          if (
            childEntity.children === undefined ||
            childEntity.children.length === 0
          ) {
            children.push(childEntity);
          }
        });
        newEntity = { ...entity };
        newEntity.children = children;
        items.push(newEntity);
      });
    return items;
  }

  getENestedChild() {
    const items = [];
  }
}
