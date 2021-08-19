import request from '@/router/axios';
//  删除数据
export const delRepository = (query) => {
    return request({
        url: '/datamonitor/intelligentoperation/knowledgebase/deleteCatalog',
        method: 'delete',
        params: query
    })
}
//  新增数据
export const addRepository = (query) => {
    return request({
        url: '/datamonitor/intelligentoperation/knowledgebase/addCatalog',
        method: 'post',
        data: query
    })
}
//  更新分类
export const updateRepository = (query) => {
    return request({
        url: '/datamonitor/intelligentoperation/knowledgebase/updateCatalog',
        method: 'post',
        data: query
    })
}
//  获取树形
export const getTree = () => {
    return request({
        url: '/datamonitor/intelligentoperation/knowledgebase/catalogtree',
        method: 'post',
    })
}
//  获取表格
export const getTable = (query) => {
    return request({
        url: '/datamonitor/intelligentoperation/knowledgebase/page',
        method: 'get',
        params: query
    })
}
//  上传文件
export const uploadFile = (query) => {
    return request({
        url: '/admin/file/upload',
        method: 'post',
        data: query
    })
}
//  下载文件
export const downloadFile = (filename) => {
    return request({
        url: `/admin/file/${filename}`,
        method: 'get',
    })
}
//  删除文件
export const remFile = (filename) => {
    return request({
        url: `/admin/file/${filename}`,
        method: 'delete',
    })
}

//  数据来源
export const querySrc = () => {
    return request({
        url: '/datamonitor/intelligentoperation/knowledgebase/querySource',
        method: 'get',
    })
}
//  切换大类选择小类
export const queryCategoryByPid = (query) => {
    return request({
        url: '/datamonitor/intelligentoperation/knowledgebase/queryCategoryByParentId',
        method: 'get',
        params: query
    })
}
//  添加知识文档
export const addBase = (query) => {
    return request({
        url: '/datamonitor/intelligentoperation/knowledgebase/addKnowledgeBase',
        method: 'post',
        data: query
    })
}
//  删除知识库记录
export const deleteBase = (query) => {
    return request({
        url: '/datamonitor/intelligentoperation/knowledgebase/deleteKnowledgeBase',
        method: 'delete',
        params: query
    })
}
//  获取知识详情数据
export const getDetail = (query) => {
    return request({
        url: '/datamonitor/intelligentoperation/knowledgebase/info',
        method: 'get',
        params: query
    })
}
//  修改知识库
export const updateBase = (query) => {
    return request({
        url: '/datamonitor/intelligentoperation/knowledgebase/updateKnowledgeBase',
        method: 'post',
        data: query
    })
}