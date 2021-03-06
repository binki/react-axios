import React from 'react'
import { debounce } from '../src/utils'
import { Request, Get, Delete, Head, Post, Put, Patch } from '../src/index'

const debounceTest = new Promise(
  (resolve) => {
    let val = 0
    let count = 0
    // create a debounce function
    const debounceFunc = debounce((arg)=>{val = arg; count++}, 3)
    debounceFunc(1) // ignored val=1, count=0
    debounceFunc(2) // ignored val=2, count=0
    debounceFunc(3) // ignored val=3, count=0
    debounceFunc(4) // called  val=4, count=1
    //setTimeout(debounceFunc, 5) // called count=2
    setTimeout(() => {
      resolve(count) // val should be 4, count should be 1
    }, 50)
  }
)

const debounceTestImmediate = new Promise(
  (resolve) => {
    let val = 0
    let count = 0
    // create a debounce function
    const debounceFunc = debounce((arg)=>{val = arg; count++}, 3, true)
    debounceFunc(1) // called val=1, count=1
    debounceFunc(2) // ignored val=2, count=1
    debounceFunc(3) // ignored val=3, count=1
    debounceFunc(4) // called val=4, count=2
    setTimeout(() => {
      resolve(count) // val should be 4, count should be 2
    }, 50)
  }
)


describe('utils', () => {
  describe('#debounce', () => {
    test('is a function...', () => {
      expect(typeof debounce).toBe('function')
    })

    test('debounce test', () => {
      return debounceTest.then((res)=> {
        expect(res).toBe(1)
      })
    })
    test('debounce test immediate', () => {
      return debounceTestImmediate.then((res)=> {
        expect(res).toBe(2)
      })
    })
  })
})

describe('components', () => {
  describe('#Request', () => {
    const component = (<Request method="get" url="http://www.example.com/">
      {(error, results, isLoading) => {
        if(error) {
          return <div>error</div>
        }
        if(isLoading) {
          return <div>loading</div>
        }
        else if(results) {
          return <div>results</div>
        }
        return <div>default</div>
      }}
    </Request>)
    test('is a function...', () => {
      expect(typeof Request).toBe('function')
    })
    test('is default...', () => {
      expect(component.props.children(false, false, false).props.children).toBe('default')
    })
    test('is loading...', () => {
      expect(component.props.children(false, false, true).props.children).toBe('loading')
    })
    test('is results...', () => {
      expect(component.props.children(false, true, false).props.children).toBe('results')
    })
    test('is error...', () => {
      expect(component.props.children(true, false, false).props.children).toBe('error')
    })
  })

  describe('#Get', () => {
    const component = Get({ url: 'http://www.example.com/' })
    test('is a function...', () => {
      expect(typeof Get).toBe('function')
    })
    test('is method=get', () => {
      expect(component.props.method).toBe('get')
    })
  })

  describe('#Delete', () => {
    const component = Delete({ url: 'http://www.example.com/' })
    test('is a function...', () => {
      expect(typeof Delete).toBe('function')
    })
    test('is method=delete', () => {
      expect(component.props.method).toBe('delete')
    })
  })

  describe('#Head', () => {
    const component = Head({ url: 'http://www.example.com/' })
    test('is a function...', () => {
      expect(typeof Head).toBe('function')
    })
    test('is method=head', () => {
      expect(component.props.method).toBe('head')
    })
  })

  describe('#Post', () => {
    const component = Post({ url: 'http://www.example.com/' })
    test('is a function...', () => {
      expect(typeof Post).toBe('function')
    })
    test('is method=post', () => {
      expect(component.props.method).toBe('post')
    })
  })

  describe('#Put', () => {
    const component = Put({ url: 'http://www.example.com/' })
    test('is a function...', () => {
      expect(typeof Put).toBe('function')
    })
    test('is method=put', () => {
      expect(component.props.method).toBe('put')
    })
  })

  describe('#Patch', () => {
    const component = Patch({ url: 'http://www.example.com/' })
    test('is a function...', () => {
      expect(typeof Patch).toBe('function')
    })
    test('is method=patch', () => {
      expect(component.props.method).toBe('patch')
    })
  })
})
