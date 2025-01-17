import { baseURL } from "./api-utils";
import { apiReq } from "./api-utils";
import { store } from "../store/store";

const backupBase = baseURL + "backups/";

const backupURLs = {
  // Backup
  avaiable: `${backupBase}avaiable/`,
  createBackup: `${backupBase}export/database/`,
  importBackup: (fileName) => `${backupBase}${fileName}/import/`,
  deleteBackup: (fileName) => `${backupBase}${fileName}/delete/`,
};

export default {
  async requestAvailable() {
    let response = await apiReq.get(backupURLs.avaiable);
    return response.data;
  },

  async import(fileName) {
    apiReq.post(backupURLs.importBackup(fileName));
    store.dispatch("requestRecentRecipes");
  },

  async delete(fileName) {
    await apiReq.delete(backupURLs.deleteBackup(fileName));
  },

  async create(tag, template) {
    let response = apiReq.post(backupURLs.createBackup, {
      tag: tag,
      template: template,
    });
    return response;
  },
};
