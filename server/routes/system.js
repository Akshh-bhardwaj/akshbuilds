import { Router } from 'express';
import os from 'os';

const router = Router();

router.get('/metrics', (req, res) => {
  try {
    const totalMemBytes = os.totalmem();
    const freeMemBytes = os.freemem();
    const usedMemBytes = totalMemBytes - freeMemBytes;

    const toMB = (bytes) => (bytes / (1024 * 1024)).toFixed(1);
    const toGB = (bytes) => (bytes / (1024 * 1024 * 1024)).toFixed(2);

    const cpus = os.cpus();
    const loadAvg = os.loadavg();
    const procMem = process.memoryUsage();

    res.json({
      success: true,
      timestamp: new Date().toISOString(),
      host: {
        hostname: os.hostname(),
        platform: os.platform(),
        release: os.release(),
        arch: os.arch(),
        uptimeSeconds: Math.floor(os.uptime()),
        uptimeFormatted: `${Math.floor(os.uptime() / 3600)}h ${Math.floor((os.uptime() % 3600) / 60)}m`
      },
      cpu: {
        model: cpus[0]?.model || 'Generic CPU',
        cores: cpus.length,
        loadAverage: {
          '1m': loadAvg[0].toFixed(2),
          '5m': loadAvg[1].toFixed(2),
          '15m': loadAvg[2].toFixed(2)
        }
      },
      memory: {
        totalGB: toGB(totalMemBytes),
        usedGB: toGB(usedMemBytes),
        freeGB: toGB(freeMemBytes),
        usedPercent: ((usedMemBytes / totalMemBytes) * 100).toFixed(1) + '%'
      },
      process: {
        nodeVersion: process.version,
        pid: process.pid,
        processUptimeFormatted: `${Math.floor(process.uptime() / 60)}m ${Math.floor(process.uptime() % 60)}s`,
        heapUsedMB: toMB(procMem.heapUsed),
        rssMB: toMB(procMem.rss)
      }
    });
  } catch (err) {
    console.error('[System Metrics Error]', err);
    res.status(500).json({ error: 'Failed to retrieve system metrics.' });
  }
});

export default router;
