import { HttpContext } from '@adonisjs/core/http'
import router from '@adonisjs/core/services/router'

router.get('/api/clusters', async (ctx: HttpContext) => {
  const { default: ClustersController } = await import('#controllers/clusters_controller')
  const controller = new ClustersController()
  return await controller.getTimeSeries(ctx)
})

router.get('/api/snapshot-policy', async (ctx: HttpContext) => {
  const { default: ClustersController } = await import('#controllers/clusters_controller')
  const controller = new ClustersController()
  return await controller.getSnapshotPolicy(ctx)
}) 

router.put('/api/snapshot-policy', async (ctx: HttpContext) => {
  const { default: ClustersController } = await import('#controllers/clusters_controller')
  const controller = new ClustersController()
  return await controller.updateSnapshotPolicy(ctx)
})

router.post('/api/clusters', async (ctx: HttpContext) => {
  const { default: ClustersController } = await import('#controllers/clusters_controller')
  const controller = new ClustersController()
  return await controller.create(ctx)
})
