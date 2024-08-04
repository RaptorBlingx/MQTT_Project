const Application = require('../models/Application');
const fs = require('fs');
const { exec } = require('child_process');

const createApplication = async (req, res) => {
  try {
    const { userId, appName } = req.body;
    const app = await Application.create(userId, appName);

    // Update Mosquitto password file
    const mosquittoPasswdPath = 'C:/Program Files/mosquitto/mosquitto_passwd';
    const passwdFilePath = 'C:/Program Files/mosquitto/config/passwd';
    exec(`"${mosquittoPasswdPath}" -b "${passwdFilePath}" ${app.mqtt_username} ${app.mqttPassword}`, (error, stdout, stderr) => {
      if (error) {
        return res.status(500).json({ message: `Command failed: ${error.message}` });
      }
      res.status(201).json(app);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateAcl = async (req, res) => {
  try {
    const { appId, publish, subscribe } = req.body;
    const app = await Application.findById(appId);
    if (!app) {
      return res.status(404).json({ message: 'Application not found' });
    }

    const aclFilePath = 'C:/Program Files/mosquitto/config/acl';
    const aclFileContent = fs.readFileSync(aclFilePath, 'utf-8');
    const aclLines = aclFileContent.split('\n');

    // Remove existing ACL entries for the user
    const updatedAclLines = [];
    let inUserBlock = false;
    aclLines.forEach(line => {
      if (line.startsWith(`user ${app.mqtt_username}`)) {
        inUserBlock = true;
      } else if (inUserBlock && !line.startsWith('topic')) {
        inUserBlock = false;
      }

      if (!inUserBlock) {
        updatedAclLines.push(line);
      }
    });

    // Add new ACL rules for the user
    updatedAclLines.push(`user ${app.mqtt_username}`);
    if (publish) {
      publish.forEach(topic => {
        updatedAclLines.push(`topic write ${topic}`);
      });
    }
    if (subscribe) {
      subscribe.forEach(topic => {
        updatedAclLines.push(`topic read ${topic}`);
      });
    }

    // Write the updated ACL lines back to the file
    fs.writeFileSync(aclFilePath, updatedAclLines.join('\n'));

    // Restart Mosquitto
    exec('net stop mosquitto && net start mosquitto', (error, stdout, stderr) => {
      if (error) {
        return res.status(500).json({ message: `Command failed: ${error.message}` });
      }
      res.status(200).json({ message: 'ACL updated successfully' });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createApplication, updateAcl };
