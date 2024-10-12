import { v4 as uuidv4 } from 'uuid';
import { HttpContext } from '@adonisjs/core/http';
import Cluster from '#models/cluster';
import SnapshotPolicy from '#models/snapshot_policy';

export default class ClustersController {
  public async getTimeSeries(ctx: HttpContext) {
    const { response } = ctx;

    try {
      const clusters = await Cluster.all();
      const timeSeriesData = clusters.map((cluster) => ({
        id: cluster.id,
        name: cluster.name,
        ...cluster.metrics,
      }));
      response.ok(timeSeriesData);
    } catch (error) {
      response.internalServerError('Error retrieving time series data');
    }
  }

  public async getSnapshotPolicy(ctx: HttpContext) {
    const { response } = ctx;

    try {
      const policy = await SnapshotPolicy.first();
      if (!policy) {
        return response.notFound('No snapshot policy found');
      }
      response.ok(policy);
    } catch (error) {
      response.internalServerError('Error retrieving snapshot policy');
    }
  }

  public async updateSnapshotPolicy(ctx: HttpContext) {
    const { request, response } = ctx;
    const {
      policy,
      applyToDirectory,
      scheduleType,
      snapshotTime,
      selectedDays,
      deletionPolicy,
      daysAfter,
      lock
    } = request.only([
      'policy',
      'applyToDirectory',
      'scheduleType',
      'snapshotTime',
      'selectedDays',
      'deletionPolicy',
      'daysAfter',
      'lock'
    ]);

    try {
      let snapshotPolicy = await SnapshotPolicy.first();

      if (!snapshotPolicy) {
        snapshotPolicy = await SnapshotPolicy.create({
          id: uuidv4(),
          policy,
          applyToDirectory,
          scheduleType,
          snapshotTime,
          selectedDays,
          deletionPolicy,
          daysAfter,
          lock: lock === true,
        });
      } else {
        // Update existing policy
        snapshotPolicy.policy = policy;
        snapshotPolicy.applyToDirectory = applyToDirectory;
        snapshotPolicy.scheduleType = scheduleType;
        snapshotPolicy.snapshotTime = snapshotTime;
        snapshotPolicy.selectedDays = selectedDays;
        snapshotPolicy.deletionPolicy = deletionPolicy;
        snapshotPolicy.daysAfter = daysAfter;
        snapshotPolicy.lock = lock === true;

        await snapshotPolicy.save();
      }

      response.ok({ message: 'Snapshot policy updated', policy: snapshotPolicy });
    } catch (error) {
      console.error('Error updating snapshot policy:', error);
      response.internalServerError('Error updating snapshot policy');
    }
  }


  public async create(ctx: HttpContext) {
    const { request, response } = ctx;
    const data = request.only(['name', 'metrics']);

    // Validate input
    if (!data.name || !data.metrics) {
      return response.badRequest('Name and metrics are required');
    }

    try {
      const cluster = await Cluster.create({
        id: uuidv4(),
        ...data,
      });
      response.created(cluster);
    } catch (error) {
      console.error('Error creating cluster:', error); // Log error for debugging
      response.internalServerError('Error creating cluster');
    }
  }
}
