export const mockDeploymentData = {
  kind: 'Deployment',
  apiVersion: 'apps/v1',
  metadata: {
    annotations: {
      'alpha.image.policy.openshift.io/resolve-names': '*',
      'app.openshift.io/route-disabled': 'false',
      'deployment.kubernetes.io/revision': '1',
      'image.openshift.io/triggers':
        '[{"from":{"kind":"ImageStreamTag","name":"hello-openshift:latest","namespace":"jai-test"},"fieldPath":"spec.template.spec.containers[?(@.name==\\"hello-openshift\\")].image","pause":"false"}]',
      'openshift.io/generated-by': 'OpenShiftWebConsole',
    },
    resourceVersion: '342643',
    name: 'hello-openshift',
    uid: 'dede72be-c7c7-4c40-85d0-03e051f90a96',
    creationTimestamp: '2023-01-31T11:32:36Z',
    generation: 1,
    managedFields: [
      {
        manager: 'Mozilla',
        operation: 'Update',
        apiVersion: 'apps/v1',
        time: '2023-01-31T11:32:36Z',
        fieldsType: 'FieldsV1',
        fieldsV1: {
          'f:metadata': {
            'f:annotations': {
              '.': {},
              'f:alpha.image.policy.openshift.io/resolve-names': {},
              'f:app.openshift.io/route-disabled': {},
              'f:image.openshift.io/triggers': {},
              'f:openshift.io/generated-by': {},
            },
            'f:labels': {
              '.': {},
              'f:app': {},
              'f:app.kubernetes.io/component': {},
              'f:app.kubernetes.io/instance': {},
              'f:app.kubernetes.io/name': {},
              'f:app.openshift.io/runtime-namespace': {},
            },
          },
          'f:spec': {
            'f:progressDeadlineSeconds': {},
            'f:replicas': {},
            'f:revisionHistoryLimit': {},
            'f:selector': {},
            'f:strategy': {
              'f:rollingUpdate': {
                '.': {},
                'f:maxSurge': {},
                'f:maxUnavailable': {},
              },
              'f:type': {},
            },
            'f:template': {
              'f:metadata': {
                'f:annotations': {
                  '.': {},
                  'f:openshift.io/generated-by': {},
                },
                'f:labels': {
                  '.': {},
                  'f:app': {},
                  'f:deployment': {},
                },
              },
              'f:spec': {
                'f:containers': {
                  'k:{"name":"hello-openshift"}': {
                    '.': {},
                    'f:image': {},
                    'f:imagePullPolicy': {},
                    'f:name': {},
                    'f:ports': {
                      '.': {},
                      'k:{"containerPort":8080,"protocol":"TCP"}': {
                        '.': {},
                        'f:containerPort': {},
                        'f:protocol': {},
                      },
                      'k:{"containerPort":8888,"protocol":"TCP"}': {
                        '.': {},
                        'f:containerPort': {},
                        'f:protocol': {},
                      },
                    },
                    'f:resources': {},
                    'f:terminationMessagePath': {},
                    'f:terminationMessagePolicy': {},
                  },
                },
                'f:dnsPolicy': {},
                'f:restartPolicy': {},
                'f:schedulerName': {},
                'f:securityContext': {},
                'f:terminationGracePeriodSeconds': {},
              },
            },
          },
        },
      },
      {
        manager: 'kube-controller-manager',
        operation: 'Update',
        apiVersion: 'apps/v1',
        time: '2023-01-31T11:32:40Z',
        fieldsType: 'FieldsV1',
        fieldsV1: {
          'f:metadata': {
            'f:annotations': {
              'f:deployment.kubernetes.io/revision': {},
            },
          },
          'f:status': {
            'f:availableReplicas': {},
            'f:conditions': {
              '.': {},
              'k:{"type":"Available"}': {
                '.': {},
                'f:lastTransitionTime': {},
                'f:lastUpdateTime': {},
                'f:message': {},
                'f:reason': {},
                'f:status': {},
                'f:type': {},
              },
              'k:{"type":"Progressing"}': {
                '.': {},
                'f:lastTransitionTime': {},
                'f:lastUpdateTime': {},
                'f:message': {},
                'f:reason': {},
                'f:status': {},
                'f:type': {},
              },
            },
            'f:observedGeneration': {},
            'f:readyReplicas': {},
            'f:replicas': {},
            'f:updatedReplicas': {},
          },
        },
        subresource: 'status',
      },
    ],
    namespace: 'jai-test',
    labels: {
      app: 'hello-openshift',
      'app.kubernetes.io/component': 'hello-openshift',
      'app.kubernetes.io/instance': 'hello-openshift',
      'app.kubernetes.io/name': 'hello-openshift',
      'app.openshift.io/runtime-namespace': 'jai-test',
    },
  },
  spec: {
    replicas: 1,
    selector: {
      matchLabels: {
        app: 'hello-openshift',
      },
    },
    template: {
      metadata: {
        creationTimestamp: null,
        labels: {
          app: 'hello-openshift',
          deployment: 'hello-openshift',
        },
        annotations: {
          'openshift.io/generated-by': 'OpenShiftWebConsole',
        },
      },
      spec: {
        containers: [
          {
            name: 'hello-openshift',
            image:
              'image-registry.openshift-image-registry.svc:5000/jai-test/hello-openshift@sha256:aaea76ff622d2f8bcb32e538e7b3cd0ef6d291953f3e7c9f556c1ba5baf47e2e',
            ports: [
              {
                containerPort: 8080,
                protocol: 'TCP',
              },
              {
                containerPort: 8888,
                protocol: 'TCP',
              },
            ],
            resources: {},
            terminationMessagePath: '/dev/termination-log',
            terminationMessagePolicy: 'File',
            imagePullPolicy: 'Always',
          },
        ],
        restartPolicy: 'Always',
        terminationGracePeriodSeconds: 30,
        dnsPolicy: 'ClusterFirst',
        securityContext: {},
        schedulerName: 'default-scheduler',
      },
    },
    strategy: {
      type: 'RollingUpdate',
      rollingUpdate: {
        maxUnavailable: '25%',
        maxSurge: '25%',
      },
    },
    revisionHistoryLimit: 10,
    progressDeadlineSeconds: 600,
  },
  status: {
    observedGeneration: 1,
    replicas: 1,
    updatedReplicas: 1,
    readyReplicas: 1,
    availableReplicas: 1,
    conditions: [
      {
        type: 'Available',
        status: 'True',
        lastUpdateTime: '2023-01-31T11:32:40Z',
        lastTransitionTime: '2023-01-31T11:32:40Z',
        reason: 'MinimumReplicasAvailable',
        message: 'Deployment has minimum availability.',
      },
      {
        type: 'Progressing',
        status: 'True',
        lastUpdateTime: '2023-01-31T11:32:40Z',
        lastTransitionTime: '2023-01-31T11:32:36Z',
        reason: 'NewReplicaSetAvailable',
        message:
          'ReplicaSet "hello-openshift-5957b95fdb" has successfully progressed.',
      },
    ],
  },
};

export const mockPodData = {
  kind: 'Pod',
  apiVersion: 'v1',
  metadata: {
    generateName: 'hello-openshift-5957b95fdb-',
    annotations: {
      'k8s.v1.cni.cncf.io/network-status':
        '[{\n    "name": "openshift-sdn",\n    "interface": "eth0",\n    "ips": [\n        "10.130.0.109"\n    ],\n    "default": true,\n    "dns": {}\n}]',
      'k8s.v1.cni.cncf.io/networks-status':
        '[{\n    "name": "openshift-sdn",\n    "interface": "eth0",\n    "ips": [\n        "10.130.0.109"\n    ],\n    "default": true,\n    "dns": {}\n}]',
      'openshift.io/generated-by': 'OpenShiftWebConsole',
      'openshift.io/scc': 'restricted-v2',
      'seccomp.security.alpha.kubernetes.io/pod': 'runtime/default',
    },
    resourceVersion: '342639',
    name: 'hello-openshift-5957b95fdb-p95jh',
    uid: 'd7e3e562-1967-4d09-af04-395a5708cc38',
    creationTimestamp: '2023-01-31T11:32:36Z',
    managedFields: [
      {
        manager: 'kube-controller-manager',
        operation: 'Update',
        apiVersion: 'v1',
        time: '2023-01-31T11:32:36Z',
        fieldsType: 'FieldsV1',
        fieldsV1: {
          'f:metadata': {
            'f:annotations': {
              '.': {},
              'f:openshift.io/generated-by': {},
            },
            'f:generateName': {},
            'f:labels': {
              '.': {},
              'f:app': {},
              'f:deployment': {},
              'f:pod-template-hash': {},
            },
            'f:ownerReferences': {
              '.': {},
              'k:{"uid":"80ad68b5-e209-45e7-965d-305fd315e635"}': {},
            },
          },
          'f:spec': {
            'f:containers': {
              'k:{"name":"hello-openshift"}': {
                '.': {},
                'f:image': {},
                'f:imagePullPolicy': {},
                'f:name': {},
                'f:ports': {
                  '.': {},
                  'k:{"containerPort":8080,"protocol":"TCP"}': {
                    '.': {},
                    'f:containerPort': {},
                    'f:protocol': {},
                  },
                  'k:{"containerPort":8888,"protocol":"TCP"}': {
                    '.': {},
                    'f:containerPort': {},
                    'f:protocol': {},
                  },
                },
                'f:resources': {},
                'f:terminationMessagePath': {},
                'f:terminationMessagePolicy': {},
              },
            },
            'f:dnsPolicy': {},
            'f:enableServiceLinks': {},
            'f:restartPolicy': {},
            'f:schedulerName': {},
            'f:securityContext': {},
            'f:terminationGracePeriodSeconds': {},
          },
        },
      },
      {
        manager: 'multus',
        operation: 'Update',
        apiVersion: 'v1',
        time: '2023-01-31T11:32:38Z',
        fieldsType: 'FieldsV1',
        fieldsV1: {
          'f:metadata': {
            'f:annotations': {
              'f:k8s.v1.cni.cncf.io/network-status': {},
              'f:k8s.v1.cni.cncf.io/networks-status': {},
            },
          },
        },
        subresource: 'status',
      },
      {
        manager: 'kubelet',
        operation: 'Update',
        apiVersion: 'v1',
        time: '2023-01-31T11:32:40Z',
        fieldsType: 'FieldsV1',
        fieldsV1: {
          'f:status': {
            'f:conditions': {
              'k:{"type":"ContainersReady"}': {
                '.': {},
                'f:lastProbeTime': {},
                'f:lastTransitionTime': {},
                'f:status': {},
                'f:type': {},
              },
              'k:{"type":"Initialized"}': {
                '.': {},
                'f:lastProbeTime': {},
                'f:lastTransitionTime': {},
                'f:status': {},
                'f:type': {},
              },
              'k:{"type":"Ready"}': {
                '.': {},
                'f:lastProbeTime': {},
                'f:lastTransitionTime': {},
                'f:status': {},
                'f:type': {},
              },
            },
            'f:containerStatuses': {},
            'f:hostIP': {},
            'f:phase': {},
            'f:podIP': {},
            'f:podIPs': {
              '.': {},
              'k:{"ip":"10.130.0.109"}': {
                '.': {},
                'f:ip': {},
              },
            },
            'f:startTime': {},
          },
        },
        subresource: 'status',
      },
    ],
    namespace: 'jai-test',
    ownerReferences: [
      {
        apiVersion: 'apps/v1',
        kind: 'ReplicaSet',
        name: 'hello-openshift-5957b95fdb',
        uid: '80ad68b5-e209-45e7-965d-305fd315e635',
        controller: true,
        blockOwnerDeletion: true,
      },
    ],
    labels: {
      app: 'hello-openshift',
      deployment: 'hello-openshift',
      'pod-template-hash': '5957b95fdb',
    },
  },
  spec: {
    restartPolicy: 'Always',
    serviceAccountName: 'default',
    imagePullSecrets: [
      {
        name: 'default-dockercfg-29blf',
      },
    ],
    priority: 0,
    schedulerName: 'default-scheduler',
    enableServiceLinks: true,
    terminationGracePeriodSeconds: 30,
    preemptionPolicy: 'PreemptLowerPriority',
    nodeName: 'ip-10-0-187-226.us-east-2.compute.internal',
    securityContext: {
      seLinuxOptions: {
        level: 's0:c28,c22',
      },
      fsGroup: 1000800000,
      seccompProfile: {
        type: 'RuntimeDefault',
      },
    },
    containers: [
      {
        resources: {},
        terminationMessagePath: '/dev/termination-log',
        name: 'hello-openshift',
        securityContext: {
          capabilities: {
            drop: ['ALL'],
          },
          runAsUser: 1000800000,
          runAsNonRoot: true,
          allowPrivilegeEscalation: false,
        },
        ports: [
          {
            containerPort: 8080,
            protocol: 'TCP',
          },
          {
            containerPort: 8888,
            protocol: 'TCP',
          },
        ],
        imagePullPolicy: 'Always',
        volumeMounts: [
          {
            name: 'kube-api-access-tkh29',
            readOnly: true,
            mountPath: '/var/run/secrets/kubernetes.io/serviceaccount',
          },
        ],
        terminationMessagePolicy: 'File',
        image:
          'image-registry.openshift-image-registry.svc:5000/jai-test/hello-openshift@sha256:aaea76ff622d2f8bcb32e538e7b3cd0ef6d291953f3e7c9f556c1ba5baf47e2e',
      },
    ],
    serviceAccount: 'default',
    volumes: [
      {
        name: 'kube-api-access-tkh29',
        projected: {
          sources: [
            {
              serviceAccountToken: {
                expirationSeconds: 3607,
                path: 'token',
              },
            },
            {
              configMap: {
                name: 'kube-root-ca.crt',
                items: [
                  {
                    key: 'ca.crt',
                    path: 'ca.crt',
                  },
                ],
              },
            },
            {
              downwardAPI: {
                items: [
                  {
                    path: 'namespace',
                    fieldRef: {
                      apiVersion: 'v1',
                      fieldPath: 'metadata.namespace',
                    },
                  },
                ],
              },
            },
            {
              configMap: {
                name: 'openshift-service-ca.crt',
                items: [
                  {
                    key: 'service-ca.crt',
                    path: 'service-ca.crt',
                  },
                ],
              },
            },
          ],
          defaultMode: 420,
        },
      },
    ],
    dnsPolicy: 'ClusterFirst',
    tolerations: [
      {
        key: 'node.kubernetes.io/not-ready',
        operator: 'Exists',
        effect: 'NoExecute',
        tolerationSeconds: 300,
      },
      {
        key: 'node.kubernetes.io/unreachable',
        operator: 'Exists',
        effect: 'NoExecute',
        tolerationSeconds: 300,
      },
    ],
  },
  status: {
    phase: 'Running',
    conditions: [
      {
        type: 'Initialized',
        status: 'True',
        lastProbeTime: null,
        lastTransitionTime: '2023-01-31T11:32:36Z',
      },
      {
        type: 'Ready',
        status: 'True',
        lastProbeTime: null,
        lastTransitionTime: '2023-01-31T11:32:40Z',
      },
      {
        type: 'ContainersReady',
        status: 'True',
        lastProbeTime: null,
        lastTransitionTime: '2023-01-31T11:32:40Z',
      },
      {
        type: 'PodScheduled',
        status: 'True',
        lastProbeTime: null,
        lastTransitionTime: '2023-01-31T11:32:36Z',
      },
    ],
    hostIP: '10.0.187.226',
    podIP: '10.130.0.109',
    podIPs: [
      {
        ip: '10.130.0.109',
      },
    ],
    startTime: '2023-01-31T11:32:36Z',
    containerStatuses: [
      {
        restartCount: 0,
        started: true,
        ready: true,
        name: 'hello-openshift',
        state: {
          running: {
            startedAt: '2023-01-31T11:32:40Z',
          },
        },
        imageID:
          'image-registry.openshift-image-registry.svc:5000/jai-test/hello-openshift@sha256:aaea76ff622d2f8bcb32e538e7b3cd0ef6d291953f3e7c9f556c1ba5baf47e2e',
        image:
          'image-registry.openshift-image-registry.svc:5000/jai-test/hello-openshift@sha256:aaea76ff622d2f8bcb32e538e7b3cd0ef6d291953f3e7c9f556c1ba5baf47e2e',
        lastState: {},
        containerID:
          'cri-o://00c14337204965d9b5058b598ae680d45c0c970ce007945ae289c12dc14788c8',
      },
    ],
    qosClass: 'BestEffort',
  },
};

export const mockReplicasetData = {
  kind: 'ReplicaSet',
  apiVersion: 'apps/v1',
  metadata: {
    annotations: {
      'alpha.image.policy.openshift.io/resolve-names': '*',
      'app.openshift.io/route-disabled': 'false',
      'deployment.kubernetes.io/desired-replicas': '1',
      'deployment.kubernetes.io/max-replicas': '2',
      'deployment.kubernetes.io/revision': '1',
      'image.openshift.io/triggers':
        '[{"from":{"kind":"ImageStreamTag","name":"hello-openshift:latest","namespace":"jai-test"},"fieldPath":"spec.template.spec.containers[?(@.name==\\"hello-openshift\\")].image","pause":"false"}]',
      'openshift.io/generated-by': 'OpenShiftWebConsole',
    },
    resourceVersion: '342640',
    name: 'hello-openshift-5957b95fdb',
    uid: '80ad68b5-e209-45e7-965d-305fd315e635',
    creationTimestamp: '2023-01-31T11:32:36Z',
    generation: 1,
    managedFields: [
      {
        manager: 'kube-controller-manager',
        operation: 'Update',
        apiVersion: 'apps/v1',
        time: '2023-01-31T11:32:36Z',
        fieldsType: 'FieldsV1',
        fieldsV1: {
          'f:metadata': {
            'f:annotations': {
              '.': {},
              'f:alpha.image.policy.openshift.io/resolve-names': {},
              'f:app.openshift.io/route-disabled': {},
              'f:deployment.kubernetes.io/desired-replicas': {},
              'f:deployment.kubernetes.io/max-replicas': {},
              'f:deployment.kubernetes.io/revision': {},
              'f:image.openshift.io/triggers': {},
              'f:openshift.io/generated-by': {},
            },
            'f:labels': {
              '.': {},
              'f:app': {},
              'f:deployment': {},
              'f:pod-template-hash': {},
            },
            'f:ownerReferences': {
              '.': {},
              'k:{"uid":"dede72be-c7c7-4c40-85d0-03e051f90a96"}': {},
            },
          },
          'f:spec': {
            'f:replicas': {},
            'f:selector': {},
            'f:template': {
              'f:metadata': {
                'f:annotations': {
                  '.': {},
                  'f:openshift.io/generated-by': {},
                },
                'f:labels': {
                  '.': {},
                  'f:app': {},
                  'f:deployment': {},
                  'f:pod-template-hash': {},
                },
              },
              'f:spec': {
                'f:containers': {
                  'k:{"name":"hello-openshift"}': {
                    '.': {},
                    'f:image': {},
                    'f:imagePullPolicy': {},
                    'f:name': {},
                    'f:ports': {
                      '.': {},
                      'k:{"containerPort":8080,"protocol":"TCP"}': {
                        '.': {},
                        'f:containerPort': {},
                        'f:protocol': {},
                      },
                      'k:{"containerPort":8888,"protocol":"TCP"}': {
                        '.': {},
                        'f:containerPort': {},
                        'f:protocol': {},
                      },
                    },
                    'f:resources': {},
                    'f:terminationMessagePath': {},
                    'f:terminationMessagePolicy': {},
                  },
                },
                'f:dnsPolicy': {},
                'f:restartPolicy': {},
                'f:schedulerName': {},
                'f:securityContext': {},
                'f:terminationGracePeriodSeconds': {},
              },
            },
          },
        },
      },
      {
        manager: 'kube-controller-manager',
        operation: 'Update',
        apiVersion: 'apps/v1',
        time: '2023-01-31T11:32:40Z',
        fieldsType: 'FieldsV1',
        fieldsV1: {
          'f:status': {
            'f:availableReplicas': {},
            'f:fullyLabeledReplicas': {},
            'f:observedGeneration': {},
            'f:readyReplicas': {},
            'f:replicas': {},
          },
        },
        subresource: 'status',
      },
    ],
    namespace: 'jai-test',
    ownerReferences: [
      {
        apiVersion: 'apps/v1',
        kind: 'Deployment',
        name: 'hello-openshift',
        uid: 'dede72be-c7c7-4c40-85d0-03e051f90a96',
        controller: true,
        blockOwnerDeletion: true,
      },
    ],
    labels: {
      app: 'hello-openshift',
      deployment: 'hello-openshift',
      'pod-template-hash': '5957b95fdb',
    },
  },
  spec: {
    replicas: 1,
    selector: {
      matchLabels: {
        app: 'hello-openshift',
        'pod-template-hash': '5957b95fdb',
      },
    },
    template: {
      metadata: {
        creationTimestamp: null,
        labels: {
          app: 'hello-openshift',
          deployment: 'hello-openshift',
          'pod-template-hash': '5957b95fdb',
        },
        annotations: {
          'openshift.io/generated-by': 'OpenShiftWebConsole',
        },
      },
      spec: {
        containers: [
          {
            name: 'hello-openshift',
            image:
              'image-registry.openshift-image-registry.svc:5000/jai-test/hello-openshift@sha256:aaea76ff622d2f8bcb32e538e7b3cd0ef6d291953f3e7c9f556c1ba5baf47e2e',
            ports: [
              {
                containerPort: 8080,
                protocol: 'TCP',
              },
              {
                containerPort: 8888,
                protocol: 'TCP',
              },
            ],
            resources: {},
            terminationMessagePath: '/dev/termination-log',
            terminationMessagePolicy: 'File',
            imagePullPolicy: 'Always',
          },
        ],
        restartPolicy: 'Always',
        terminationGracePeriodSeconds: 30,
        dnsPolicy: 'ClusterFirst',
        securityContext: {},
        schedulerName: 'default-scheduler',
      },
    },
  },
  status: {
    replicas: 1,
    fullyLabeledReplicas: 1,
    readyReplicas: 1,
    availableReplicas: 1,
    observedGeneration: 1,
  },
};
